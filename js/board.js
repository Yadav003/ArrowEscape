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
    this.arrows = [];
    this.movementEngine = null;
    this.gameStateManager = new GameStateManager(false);
    this.animationManager = new AnimationManager();
    this.inputManager = new InputManager(this.container, {
      onArrowSelected: ({ arrow }) => {
        const analysis = this.movementEngine.analyze(arrow.id);
        this.dispatchBoardEvent("ArrowSelected", {
          arrow,
          level: this.currentLevel,
          analysis,
        });
        this.handleArrowAnimation(arrow, analysis);
      },
      onArrowDeselected: ({ arrow }) => {
        this.renderer.render(this.currentLevel, this.gameStateManager.getActiveArrows());
        this.dispatchBoardEvent("ArrowDeselected", { arrow, level: this.currentLevel });
      },
    });

    this.livesManager = options.livesManager || null;
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

  handleArrowAnimation(arrow, analysis) {
    const element = this.container.querySelector(`#arrow-path-${CSS.escape(String(arrow.id))}`);
    if (!element) {
      return;
    }

    this.inputManager.setEnabled(false);
    const isCorrectMove = analysis.canMove;
    this.renderer.setArrowState(arrow.id, isCorrectMove ? "selected" : "wrong");

    if (!isCorrectMove && this.livesManager) {
      this.livesManager.loseLife();
    }

    const duration = isCorrectMove
      ? this.animationManager.getDuration(analysis.travelDistance)
      : 120;

    this.dispatchBoardEvent("AnimationStarted", {
      arrow,
      analysis,
      duration,
    });

    const animationPromise = isCorrectMove
      ? this.animationManager.animateMovement(element, arrow.direction, analysis.travelDistance)
      : this.animationManager.animateBlocked(element, arrow.direction);

    animationPromise
      .then(() => {
        this.dispatchBoardEvent("AnimationCompleted", {
          arrow,
          analysis,
        });

        if (isCorrectMove) {
          this.handleArrowExit(arrow, element);
        }
      })
      .catch(() => {
        this.dispatchBoardEvent("AnimationCancelled", {
          arrow,
          analysis,
        });
      })
      .finally(() => {
        if (!isCorrectMove) {
          this.renderer.clearArrowState(arrow.id);
          this.inputManager.clearSelection();
        }

        if (!this.livesManager || !this.livesManager.isGameOver()) {
          this.inputManager.setEnabled(true);
        }
      });
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
