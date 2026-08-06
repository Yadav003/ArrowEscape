import { Arrow } from "./arrow.js";

export class GameStateManager extends EventTarget {
  constructor(debug = false) {
    super();
    this.debug = Boolean(debug);
    this.currentLevel = null;
    this.arrows = [];
    this.levelCompleted = false;
  }

  initLevel(level) {
    if (!level || !level.board || !Array.isArray(level.paths)) {
      throw new Error("GameStateManager.initLevel requires a valid level object.");
    }

    this.currentLevel = level;
    this.levelCompleted = false;
    this.arrows = level.paths.map(
      (path) =>
        new Arrow({
          id: path.id,
          direction: path.direction,
          path: path.path,
          metadata: path.metadata || null,
        })
    );

    this.emitBoardUpdated();
    return this;
  }

  getActiveArrows() {
    return this.arrows.filter((arrow) => arrow.isActive && !arrow.isRemoved);
  }

  getRemovedArrows() {
    return this.arrows.filter((arrow) => arrow.isRemoved);
  }

  getMovableArrows(movementEngine) {
    if (!movementEngine) {
      return [];
    }
    return this.getActiveArrows().filter((arrow) => movementEngine.analyze(arrow.id).canMove);
  }

  getBlockedArrows(movementEngine) {
    if (!movementEngine) {
      return [];
    }
    return this.getActiveArrows().filter((arrow) => !movementEngine.analyze(arrow.id).canMove);
  }

  getAllArrows() {
    return Array.from(this.arrows);
  }

  getArrowById(id) {
    return this.arrows.find((arrow) => String(arrow.id) === String(id)) || null;
  }

  removeArrow(id) {
    const arrow = this.getArrowById(id);
    if (!arrow) {
      throw new Error(`GameStateManager.removeArrow could not find arrow ${id}.`);
    }

    if (!arrow.isActive || arrow.isRemoved) {
      return arrow;
    }

    arrow.isActive = false;
    arrow.isRemoved = true;
    arrow.isMoving = false;
    arrow.isSelected = false;
    arrow.isBlocked = false;

    this.dispatchEvent(
      new CustomEvent("ArrowRemoved", {
        detail: { arrow },
      })
    );

    if (this.getActiveArrows().length === 0) {
      this.levelCompleted = true;
      this.dispatchEvent(
        new CustomEvent("LevelCompleted", {
          detail: {
            level: this.currentLevel,
          },
        })
      );
    }

    return arrow;
  }

  updateBlocking(movementEngine) {
    if (!movementEngine) {
      return;
    }

    this.getActiveArrows().forEach((arrow) => {
      const analysis = movementEngine.analyze(arrow.id);
      arrow.isBlocked = !analysis.canMove;
    });

    return this;
  }

  emitBoardUpdated(movementEngine) {
    const activeArrows = this.getActiveArrows();
    const removedArrows = this.getRemovedArrows();
    const movableArrows = this.getMovableArrows(movementEngine);
    const blockedArrows = this.getBlockedArrows(movementEngine);

    this.dispatchEvent(
      new CustomEvent("BoardUpdated", {
        detail: {
          level: this.currentLevel,
          activeArrows,
          removedArrows,
          movableArrows,
          blockedArrows,
          levelCompleted: this.levelCompleted,
        },
      })
    );

    if (this.debug) {
      console.log(`Remaining: ${activeArrows.length}`);
      console.log(`Removed: ${removedArrows.length}`);
      console.log(`Movable: ${movableArrows.length}`);
      console.log(`Blocked: ${blockedArrows.length}`);
      console.log(`Level Complete: ${this.levelCompleted}`);
    }
  }
}
