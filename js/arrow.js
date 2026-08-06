export class Arrow {
  constructor({ id, direction, path, metadata = null }) {
    if (id == null) {
      throw new Error("Arrow requires a valid id.");
    }

    this.id = String(id);
    this.direction = typeof direction === "string" ? direction.toUpperCase() : "UNKNOWN";
    this.path = String(path || "");
    this.metadata = metadata;
    this.isSelected = false;
    this.isActive = true;
    this.isRemoved = false;
    this.isMoving = false;
    this._boundingBox = null;
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

  getBoundingBox() {
    if (this._boundingBox) {
      return this._boundingBox;
    }

    const points = Arrow.parseSvgPath(this.path);
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
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
      } else if (command === "Z") {
        // Close path - ignore for bounding box calculations
      }
    }

    if (!points.length) {
      points.push({ x: currentX, y: currentY });
    }

    return points;
  }
}
