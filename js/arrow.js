export class Arrow {
  constructor({ id, direction = null, path = "", metadata = null }) {
    if (id == null) {
      throw new Error("Arrow requires a valid id.");
    }

    this.id = String(id);
    this.path = String(path || "").trim();
    this.metadata = metadata;
    this.isSelected = false;
    this.isActive = true;
    this.isRemoved = false;
    this.isMoving = false;
    this.isBlocked = false;

    this._pathPoints = null;
    this._segments = null;
    this._boundingBox = null;
    this._pathLength = null;

    // Geometric derivation
    this.points = this.getPathPoints();
    this.headPoint = this.getPathEndPoint();
    this.direction = this.determineDirection(direction);
  }

  determineDirection(fallbackDirection) {
    if (this.points.length >= 2) {
      const p1 = this.points[this.points.length - 2];
      const p2 = this.points[this.points.length - 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        return dx > 0 ? "RIGHT" : "LEFT";
      } else if (Math.abs(dy) > 0) {
        return dy > 0 ? "DOWN" : "UP";
      }
    }

    if (typeof fallbackDirection === "string" && fallbackDirection.trim()) {
      return fallbackDirection.trim().toUpperCase();
    }

    return "RIGHT";
  }

  select() {
    this.isSelected = true;
    return this;
  }

  deselect() {
    this.isSelected = false;
    return this;
  }

  getPathPoints() {
    if (this._pathPoints) {
      return this._pathPoints;
    }
    this._pathPoints = Arrow.parseSvgPath(this.path);
    return this._pathPoints;
  }

  getSegments() {
    if (this._segments) {
      return this._segments;
    }

    const points = this.getPathPoints();
    const segments = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const minX = Math.min(p1.x, p2.x);
      const maxX = Math.max(p1.x, p2.x);
      const minY = Math.min(p1.y, p2.y);
      const maxY = Math.max(p1.y, p2.y);
      const isHorizontal = Math.abs(p1.y - p2.y) < 0.5;
      const isVertical = Math.abs(p1.x - p2.x) < 0.5;

      segments.push({
        p1,
        p2,
        minX,
        maxX,
        minY,
        maxY,
        isHorizontal,
        isVertical,
      });
    }

    this._segments = segments;
    return this._segments;
  }

  getPathLength() {
    if (this._pathLength != null) {
      return this._pathLength;
    }

    const points = this.getPathPoints();
    let total = 0;

    for (let i = 1; i < points.length; i += 1) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      total += Math.hypot(dx, dy);
    }

    this._pathLength = total;
    return this._pathLength;
  }

  getPathEndPoint() {
    const points = this.getPathPoints();
    return points.length ? points[points.length - 1] : { x: 0, y: 0 };
  }

  getPathStartPoint() {
    const points = this.getPathPoints();
    return points.length ? points[0] : { x: 0, y: 0 };
  }

  getBoundingBox() {
    if (this._boundingBox) {
      return this._boundingBox;
    }

    const points = this.getPathPoints();
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    this._boundingBox = { minX, minY, maxX, maxY };
    return this._boundingBox;
  }

  static parseSvgPath(path) {
    if (typeof path !== "string" || path.trim() === "") {
      return [{ x: 0, y: 0 }];
    }

    const commands = path.match(/[a-zA-Z][^a-zA-Z]*/g) || [];
    let currentX = 0;
    let currentY = 0;
    const points = [];

    for (const token of commands) {
      const command = token[0].toUpperCase();
      const args = token
        .slice(1)
        .trim()
        .split(/[,\s]+/)
        .filter(Boolean)
        .map(Number);

      if (command === "M" || command === "L") {
        for (let i = 0; i + 1 < args.length; i += 2) {
          currentX = args[i];
          currentY = args[i + 1];
          points.push({ x: currentX, y: currentY });
        }
      } else if (command === "H") {
        for (const x of args) {
          currentX = x;
          points.push({ x: currentX, y: currentY });
        }
      } else if (command === "V") {
        for (const y of args) {
          currentY = y;
          points.push({ x: currentX, y: currentY });
        }
      }
    }

    if (!points.length) {
      points.push({ x: currentX, y: currentY });
    }

    return points;
  }
}
