export class AnimationManager {
  constructor() {
    this.isAnimating = false;
    this.frameId = null;
    this.cancelRequested = false;
  }

  animateMovement(element, direction, distance) {
    if (!element || distance <= 0) {
      return Promise.resolve();
    }

    const directionVector = this.getDirectionUnit(direction);
    const totalTravel = Math.max(distance, 500);
    const duration = 320; // Snappy, dynamic escape
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
        // Ease-in acceleration: starts moving, then zooms off screen
        const eased = Math.pow(progress, 1.8);
        const traveled = totalTravel * eased;

        const translation = {
          x: from.x + directionVector.x * traveled,
          y: from.y + directionVector.y * traveled,
        };

        this.applyTranslation(element, translation);
        element.style.opacity = String(Math.max(0, 1 - progress * 0.8));

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
    if (!element) {
      return Promise.resolve();
    }

    const duration = 180;
    const start = performance.now();
    const from = this.getCurrentTranslation(element);
    const shift = this.getBlockedShift(direction, 14);

    this.isAnimating = true;
    this.cancelRequested = false;

    return new Promise((resolve, reject) => {
      const step = (timestamp) => {
        if (this.cancelRequested) {
          this.finishAnimation(element, from);
          reject(new Error("Animation cancelled."));
          return;
        }

        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        // Elastic rebound curve: out to obstacle, bounce back with spring
        const factor = Math.sin(progress * Math.PI * 1.5) * Math.exp(-progress * 2.5);

        this.applyTranslation(element, {
          x: from.x + shift.x * factor,
          y: from.y + shift.y * factor,
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
        return { x: 1, y: 0 };
    }
  }

  getBlockedShift(direction, amount) {
    const unit = this.getDirectionUnit(direction);
    return { x: unit.x * amount, y: unit.y * amount };
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
}
