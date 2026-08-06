export class AnimationManager {
  constructor() {
    this.isAnimating = false;
    this.frameId = null;
    this.cancelRequested = false;
  }

  animateMovement(element, direction, distance) {
    if (this.isAnimating) {
      return Promise.reject(new Error("Animation already running."));
    }

    if (!element || distance <= 0) {
      return Promise.resolve();
    }

    const pathLength = element.getTotalLength();
    const startPoint = element.getPointAtLength(0);
    const endPoint = element.getPointAtLength(pathLength);
    const directionVector = this.getDirectionUnit(direction);
    const totalTravel = pathLength + distance;
    const duration = this.getDuration(totalTravel);
    const from = this.getCurrentTranslation(element);

    this.isAnimating = true;
    this.cancelRequested = false;
    const start = performance.now();

    return new Promise((resolve, reject) => {
      const step = (timestamp) => {
        if (this.cancelRequested) {
          this.finishAnimation(element, from);
          reject(new Error("Animation cancelled."));
          return;
        }

        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = this.easeOutCubic(progress);
        const traveled = totalTravel * eased;
        const pathDistance = Math.min(traveled, pathLength);
        const extraDistance = Math.max(0, traveled - pathLength);
        const currentPoint = pathDistance <= pathLength
          ? element.getPointAtLength(pathDistance)
          : endPoint;
        const target = {
          x: currentPoint.x + directionVector.x * extraDistance,
          y: currentPoint.y + directionVector.y * extraDistance,
        };
        const translation = {
          x: from.x + (target.x - startPoint.x),
          y: from.y + (target.y - startPoint.y),
        };

        this.applyTranslation(element, translation);

        if (progress < 1) {
          this.frameId = requestAnimationFrame(step);
          return;
        }

        this.finishAnimation(element, translation);
        resolve();
      };

      this.frameId = requestAnimationFrame(step);
    }).finally(() => {
      this.isAnimating = false;
      this.cancelRequested = false;
      this.frameId = null;
    });
  }

  animateBlocked(element, direction) {
    if (this.isAnimating) {
      return Promise.reject(new Error("Animation already running."));
    }

    if (!element) {
      return Promise.resolve();
    }

    this.isAnimating = true;
    this.cancelRequested = false;
    const duration = 120;
    const start = performance.now();
    const from = this.getCurrentTranslation(element);
    const shift = this.getBlockedShift(direction, 5);

    return new Promise((resolve, reject) => {
      const step = (timestamp) => {
        if (this.cancelRequested) {
          this.finishAnimation(element, from);
          reject(new Error("Animation cancelled."));
          return;
        }

        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 0.5
          ? this.easeOutQuad(progress * 2)
          : 1 - this.easeOutQuad((progress - 0.5) * 2);

        this.applyTranslation(element, {
          x: from.x + shift.x * eased,
          y: from.y + shift.y * eased,
        });

        if (progress < 1) {
          this.frameId = requestAnimationFrame(step);
          return;
        }

        this.finishAnimation(element, from);
        resolve();
      };

      this.frameId = requestAnimationFrame(step);
    }).finally(() => {
      this.isAnimating = false;
      this.cancelRequested = false;
      this.frameId = null;
    });
  }

  cancel() {
    if (!this.isAnimating) {
      return;
    }

    this.cancelRequested = true;
  }

  getDuration(distance) {
    const min = 250;
    const max = 450;
    const scaled = min + Math.min(1, distance / 200) * (max - min);
    return Math.round(scaled);
  }

  getDirectionUnit(direction) {
    switch (String(direction).toUpperCase()) {
      case "RIGHT":
        return { x: 1, y: 0 };
      case "LEFT":
        return { x: -1, y: 0 };
      case "DOWN":
        return { x: 0, y: 1 };
      case "UP":
        return { x: 0, y: -1 };
      default:
        return { x: 0, y: 0 };
    }
  }

  getBlockedShift(direction, amount) {
    switch (String(direction).toUpperCase()) {
      case "RIGHT":
        return { x: amount, y: 0 };
      case "LEFT":
        return { x: -amount, y: 0 };
      case "DOWN":
        return { x: 0, y: amount };
      case "UP":
        return { x: 0, y: -amount };
      default:
        return { x: 0, y: 0 };
    }
  }

  getCurrentTranslation(element) {
    const transform = element.getAttribute("transform") || "";
    const regex = /translate\s*\(\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)\s*\)/;
    const match = transform.match(regex);
    if (!match) {
      return { x: 0, y: 0 };
    }
    return { x: Number(match[1]), y: Number(match[2]) };
  }

  applyTranslation(element, translation) {
    element.setAttribute("transform", `translate(${translation.x} ${translation.y})`);
  }

  finishAnimation(element, translation) {
    if (element) {
      this.applyTranslation(element, translation);
    }
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  easeOutQuad(t) {
    return 1 - (1 - t) * (1 - t);
  }
}
