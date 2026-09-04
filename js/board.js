import { SVGRenderer } from "./svgRenderer.js";
import { Arrow } from "./arrow.js";
import { InputManager } from "./inputManager.js";
import { MovementEngine } from "./movementEngine.js";
import { AnimationManager } from "./animationManager.js";
import { GameStateManager } from "./gameStateManager.js";

export class Board {
  constructor(container, options = {}) {
    this.container = container;
    this.renderer = new SVGRenderer(this.container, options);
    this.currentLevel = null;
    this.movementEngine = null;
    this.gameStateManager = new GameStateManager(false);
    this.animationManager = new AnimationManager();
    this.audioManager = options.audioManager || null;
    this.livesManager = options.livesManager || null;

    this.inputManager = new InputManager(this.container, {
      onArrowSelected: ({ arrow }) => {
        const analysis = this.movementEngine.analyze(arrow.id);
        this.dispatchBoardEvent("ArrowSelected", {
          arrow,
          level: this.currentLevel,
          analysis,
        });
        this.handleArrowInteraction(arrow, analysis);
      },
      onArrowDeselected: ({ arrow }) => {
        this.renderer.clearArrowState(arrow.id);
        this.dispatchBoardEvent("ArrowDeselected", { arrow, level: this.currentLevel });
      },
    });

    if (this.livesManager) {
      this.setupLivesListeners();
    }

    this.gameStateManager.addEventListener("BoardUpdated", (event) => {
      this.dispatchBoardEvent("BoardUpdated", event.detail);
    });

    this.gameStateManager.addEventListener("ArrowRemoved", (event) => {
      this.dispatchBoardEvent("ArrowRemoved", event.detail);
    });

    this.gameStateManager.addEventListener("LevelCompleted", (event) => {
      if (this.audioManager) {
        this.audioManager.playLevelComplete();
      }
      this.dispatchBoardEvent("LevelCompleted", event.detail);
      this.inputManager.setEnabled(false);
    });
  }

  dispatchBoardEvent(type, detail) {
    this.container.dispatchEvent(
      new CustomEvent(type, {
        detail,
        bubbles: true,
      })
    );
  }

  setupLivesListeners() {
    this.livesManager.addEventListener("LifeLost", (event) => {
      if (this.audioManager) {
        this.audioManager.playLifeLost();
      }
      this.dispatchBoardEvent("LifeLost", event.detail);
    });

    this.livesManager.addEventListener("LivesChanged", (event) => {
      this.dispatchBoardEvent("LivesChanged", event.detail);
    });

    this.livesManager.addEventListener("GameOver", (event) => {
      this.dispatchBoardEvent("GameOver", event.detail);
      this.inputManager.setEnabled(false);
    });
  }

  handleArrowInteraction(arrow, analysis) {
    const groupElement = this.container.querySelector(`#arrow-group-${CSS.escape(String(arrow.id))}`);
    if (!groupElement) {
      return;
    }

    this.inputManager.setEnabled(false);
    const isCorrectMove = analysis.canMove;

    if (isCorrectMove) {
      if (this.audioManager) {
        this.audioManager.playEscape();
      }
      this.renderer.setArrowState(arrow.id, "selected");

      this.animationManager
        .animateMovement(groupElement, arrow.direction, analysis.travelDistance)
        .then(() => {
          this.handleArrowExit(arrow, groupElement);
        })
        .finally(() => {
          if (!this.livesManager || !this.livesManager.isGameOver()) {
            this.inputManager.setEnabled(true);
          }
        });
    } else {
      if (this.audioManager) {
        this.audioManager.playBlocked();
      }
      this.renderer.setArrowState(arrow.id, "wrong");

      if (this.livesManager) {
        this.livesManager.loseLife();
      }

      this.animationManager
        .animateBlocked(groupElement, arrow.direction)
        .then(() => {
          this.renderer.clearArrowState(arrow.id);
          this.inputManager.clearSelection();
        })
        .finally(() => {
          if (!this.livesManager || !this.livesManager.isGameOver()) {
            this.inputManager.setEnabled(true);
          }
        });
    }
  }

  provideHint() {
    if (!this.movementEngine) return null;

    const activeArrows = this.gameStateManager.getActiveArrows();
    const freeArrows = activeArrows.filter((a) => this.movementEngine.analyze(a.id).canMove);

    if (freeArrows.length === 0) return null;

    const hintArrow = freeArrows[0];
    this.renderer.setArrowState(hintArrow.id, "hint");

    window.setTimeout(() => {
      this.renderer.clearArrowState(hintArrow.id);
    }, 1400);

    return hintArrow;
  }

  render(level) {
    if (!level || typeof level !== "object") {
      throw new Error("Board.render requires a valid level object.");
    }

    this.currentLevel = level;
    this.gameStateManager.initLevel(level);
    this.movementEngine = new MovementEngine(level.board, this.gameStateManager.getActiveArrows());
    this.gameStateManager.updateBlocking(this.movementEngine);
    this.gameStateManager.emitBoardUpdated(this.movementEngine);
    this.inputManager.setArrows(this.gameStateManager.getActiveArrows());
    this.renderer.render(level, this.gameStateManager.getActiveArrows());
  }

  handleArrowExit(arrow, element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }

    this.gameStateManager.removeArrow(arrow.id);
    this.movementEngine.setArrows(this.gameStateManager.getActiveArrows());
    this.gameStateManager.updateBlocking(this.movementEngine);
    this.gameStateManager.emitBoardUpdated(this.movementEngine);
    this.inputManager.setArrows(this.gameStateManager.getActiveArrows());
  }

  resize() {
    if (!this.currentLevel) {
      return;
    }
    this.renderer.render(this.currentLevel, this.gameStateManager.getActiveArrows());
  }
}
