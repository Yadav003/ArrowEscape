export class MovementEngine {
  constructor(board, arrows = []) {
    if (!board || typeof board.width !== "number" || typeof board.height !== "number") {
      throw new Error("MovementEngine requires a valid board with width and height.");
    }

    this.board = {
      width: board.width,
      height: board.height,
    };
    this.arrows = Array.isArray(arrows) ? arrows : [];
  }

  setArrows(arrows = []) {
    this.arrows = Array.isArray(arrows) ? arrows : [];
    return this;
  }

  analyze(arrowId) {
    const arrow = this.arrows.find((item) => String(item.id) === String(arrowId));
    if (!arrow) {
      throw new Error(`MovementEngine.analyze could not find arrow ${arrowId}.`);
    }

    const direction = String(arrow.direction).toUpperCase();
    const endPoint = arrow.getPathEndPoint();
    const exitPoint = this.getExitPoint(endPoint, direction);
    const blockingArrow = this.findBlockingArrow(endPoint, direction, arrow.id);
    const canMove = blockingArrow == null;
    const distanceAfterPath = canMove
      ? this.distanceToBoundary(endPoint, direction)
      : this.distanceToArrow(endPoint, blockingArrow.getBoundingBox(), direction);
    const travelDistance = Math.max(0, arrow.getPathLength() + distanceAfterPath);

    return {
      arrowId: arrow.id,
      direction,
      canMove,
      blockingArrowId: blockingArrow ? blockingArrow.id : null,
      travelDistance,
      exitPoint,
    };
  }

  isBlocked(selectedBBox, direction, selectedId) {
    return this.findBlockingArrow(selectedBBox, direction, selectedId) != null;
  }

  findBlockingArrow(selectedPoint, direction, selectedId) {
    const candidates = this.arrows.filter((arrow) => {
      if (!arrow.isActive || arrow.isRemoved) {
        return false;
      }
      if (String(arrow.id) === String(selectedId)) {
        return false;
      }
      const bbox = arrow.getBoundingBox();
      return this.isCandidateInPath(selectedPoint, bbox, direction);
    });

    if (!candidates.length) {
      return null;
    }

    const sorted = candidates
      .map((arrow) => ({ arrow, distance: this.distanceToArrow(selectedPoint, arrow.getBoundingBox(), direction) }))
      .filter((item) => item.distance >= 0)
      .sort((a, b) => a.distance - b.distance);

    return sorted.length ? sorted[0].arrow : null;
  }

  isCandidateInPath(selectedPoint, candidateBBox, direction) {
    switch (direction) {
      case "RIGHT":
        return candidateBBox.minX >= selectedPoint.x && this.overlapsVertically(selectedPoint, candidateBBox);
      case "LEFT":
        return candidateBBox.maxX <= selectedPoint.x && this.overlapsVertically(selectedPoint, candidateBBox);
      case "DOWN":
        return candidateBBox.minY >= selectedPoint.y && this.overlapsHorizontally(selectedPoint, candidateBBox);
      case "UP":
        return candidateBBox.maxY <= selectedPoint.y && this.overlapsHorizontally(selectedPoint, candidateBBox);
      default:
        return false;
    }
  }

  distanceToArrow(selectedBBox, candidateBBox, direction) {
    switch (direction) {
      case "RIGHT":
        return candidateBBox.minX - selectedBBox.maxX;
      case "LEFT":
        return selectedBBox.minX - candidateBBox.maxX;
      case "DOWN":
        return candidateBBox.minY - selectedBBox.maxY;
      case "UP":
        return selectedBBox.minY - candidateBBox.maxY;
      default:
        return Infinity;
    }
  }

  calculateTravelDistance(selectedBBox, direction, blockingArrow) {
    const distanceToEdge = this.distanceToBoundary(selectedBBox, direction);
    if (!blockingArrow) {
      return Math.max(0, distanceToEdge);
    }

    const blockingBBox = blockingArrow.getBoundingBox();
    return Math.max(0, this.distanceToArrow(selectedBBox, blockingBBox, direction));
  }

  distanceToBoundary(selectedPoint, direction) {
    switch (direction) {
      case "RIGHT":
        return this.board.width - selectedPoint.x;
      case "LEFT":
        return selectedPoint.x;
      case "DOWN":
        return this.board.height - selectedPoint.y;
      case "UP":
        return selectedPoint.y;
      default:
        return 0;
    }
  }

  getExitPoint(selectedPoint, direction) {
    switch (direction) {
      case "RIGHT":
        return { x: this.board.width, y: selectedPoint.y };
      case "LEFT":
        return { x: 0, y: selectedPoint.y };
      case "DOWN":
        return { x: selectedPoint.x, y: this.board.height };
      case "UP":
        return { x: selectedPoint.x, y: 0 };
      default:
        return { x: selectedPoint.x, y: selectedPoint.y };
    }
  }

  overlapsHorizontally(a, b) {
    return a.minX < b.maxX && b.minX < a.maxX;
  }

  overlapsVertically(a, b) {
    return a.minY < b.maxY && b.minY < a.maxY;
    }
}
