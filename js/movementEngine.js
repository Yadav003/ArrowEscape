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
    this.tolerance = 12; // Grid & stroke tolerance
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

    const direction = arrow.direction;
    const headPoint = arrow.getPathEndPoint();
    const exitPoint = this.getExitPoint(headPoint, direction);
    const boundaryDistance = this.distanceToBoundary(headPoint, direction);

    const blocker = this.findClosestBlocker(arrow, headPoint, direction);
    const canMove = blocker == null;

    return {
      arrowId: arrow.id,
      direction,
      canMove,
      blockingArrowId: blocker ? blocker.arrow.id : null,
      blockingSegment: blocker ? blocker.segment : null,
      collisionPoint: blocker ? blocker.collisionPoint : null,
      travelDistance: canMove ? boundaryDistance + 200 : Math.max(0, blocker.distance),
      exitPoint,
    };
  }

  findClosestBlocker(targetArrow, headPoint, direction) {
    const activeArrows = this.arrows.filter(
      (a) => a.isActive && !a.isRemoved && String(a.id) !== String(targetArrow.id)
    );

    let closest = null;

    for (const arrow of activeArrows) {
      const segments = arrow.getSegments();
      for (const seg of segments) {
        const hit = this.rayIntersectSegment(headPoint, direction, seg);
        if (hit !== null && hit.distance > 0.5) {
          if (!closest || hit.distance < closest.distance) {
            closest = {
              arrow,
              segment: seg,
              distance: hit.distance,
              collisionPoint: hit.point,
            };
          }
        }
      }
    }

    return closest;
  }

  rayIntersectSegment(head, direction, seg) {
    const tol = this.tolerance;
    const minX = seg.minX;
    const maxX = seg.maxX;
    const minY = seg.minY;
    const maxY = seg.maxY;

    switch (direction) {
      case "RIGHT": {
        // Intersects vertical segment
        if (seg.isVertical) {
          if (seg.p1.x > head.x + 2 && head.y >= minY - tol && head.y <= maxY + tol) {
            const dist = seg.p1.x - head.x;
            return { distance: dist, point: { x: seg.p1.x, y: head.y } };
          }
        }
        // Intersects collinear horizontal segment in the same lane
        else if (seg.isHorizontal) {
          if (Math.abs(seg.p1.y - head.y) <= tol && maxX > head.x + 2) {
            const dist = Math.max(0, minX - head.x);
            return { distance: dist, point: { x: Math.max(head.x, minX), y: head.y } };
          }
        }
        break;
      }

      case "LEFT": {
        if (seg.isVertical) {
          if (seg.p1.x < head.x - 2 && head.y >= minY - tol && head.y <= maxY + tol) {
            const dist = head.x - seg.p1.x;
            return { distance: dist, point: { x: seg.p1.x, y: head.y } };
          }
        } else if (seg.isHorizontal) {
          if (Math.abs(seg.p1.y - head.y) <= tol && minX < head.x - 2) {
            const dist = Math.max(0, head.x - maxX);
            return { distance: dist, point: { x: Math.min(head.x, maxX), y: head.y } };
          }
        }
        break;
      }

      case "DOWN": {
        if (seg.isHorizontal) {
          if (seg.p1.y > head.y + 2 && head.x >= minX - tol && head.x <= maxX + tol) {
            const dist = seg.p1.y - head.y;
            return { distance: dist, point: { x: head.x, y: seg.p1.y } };
          }
        } else if (seg.isVertical) {
          if (Math.abs(seg.p1.x - head.x) <= tol && maxY > head.y + 2) {
            const dist = Math.max(0, minY - head.y);
            return { distance: dist, point: { x: head.x, y: Math.max(head.y, minY) } };
          }
        }
        break;
      }

      case "UP": {
        if (seg.isHorizontal) {
          if (seg.p1.y < head.y - 2 && head.x >= minX - tol && head.x <= maxX + tol) {
            const dist = head.y - seg.p1.y;
            return { distance: dist, point: { x: head.x, y: seg.p1.y } };
          }
        } else if (seg.isVertical) {
          if (Math.abs(seg.p1.x - head.x) <= tol && minY < head.y - 2) {
            const dist = Math.max(0, head.y - maxY);
            return { distance: dist, point: { x: head.x, y: Math.min(head.y, maxY) } };
          }
        }
        break;
      }
    }

    return null;
  }

  distanceToBoundary(point, direction) {
    switch (direction) {
      case "RIGHT":
        return Math.max(0, this.board.width - point.x);
      case "LEFT":
        return Math.max(0, point.x);
      case "DOWN":
        return Math.max(0, this.board.height - point.y);
      case "UP":
        return Math.max(0, point.y);
      default:
        return 0;
    }
  }

  getExitPoint(point, direction) {
    switch (direction) {
      case "RIGHT":
        return { x: this.board.width + 100, y: point.y };
      case "LEFT":
        return { x: -100, y: point.y };
      case "DOWN":
        return { x: point.x, y: this.board.height + 100 };
      case "UP":
        return { x: point.x, y: -100 };
      default:
        return { x: point.x, y: point.y };
    }
  }
}
