export class InputManager {
  constructor(container, callbacks = {}) {
    if (!container || !(container instanceof Element)) {
      throw new Error("InputManager requires a valid DOM container.");
    }

    this.container = container;
    this.onArrowSelected = typeof callbacks.onArrowSelected === "function" ? callbacks.onArrowSelected : () => {};
    this.onArrowDeselected = typeof callbacks.onArrowDeselected === "function" ? callbacks.onArrowDeselected : () => {};
    this.arrowMap = new Map();
    this.selectedArrowId = null;
    this.enabled = true;

    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.container.addEventListener("pointerdown", this.handlePointerDown);
  }

  setArrows(arrows = []) {
    this.arrowMap.clear();
    this.selectedArrowId = null;

    arrows.forEach((arrow) => {
      if (arrow && arrow.id != null) {
        this.arrowMap.set(String(arrow.id), arrow);
      }
    });
  }

  setEnabled(enabled = true) {
    this.enabled = Boolean(enabled);
  }

  handlePointerDown(event) {
    if (!this.enabled) {
      return;
    }

    const targetPath = event.target.closest(".board-path");
    if (!targetPath || !this.container.contains(targetPath)) {
      this.deselectCurrent();
      return;
    }

    this.createRipple(event);
    const arrowId = targetPath.dataset.arrowId;
    if (!arrowId) {
      return;
    }

    this.selectArrow(arrowId);
  }

  createRipple(event) {
    const rect = this.container.getBoundingClientRect();
    const ripple = document.createElement("div");
    ripple.className = "touch-ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    this.container.appendChild(ripple);

    requestAnimationFrame(() => ripple.classList.add("expand"));
    window.setTimeout(() => {
      ripple.remove();
    }, 300);
  }

  selectArrow(arrowId) {
    const selectedId = String(arrowId);
    const arrow = this.arrowMap.get(selectedId);
    if (!arrow) {
      return;
    }

    if (this.selectedArrowId === selectedId) {
      return;
    }

    this.deselectCurrent();
    arrow.select();
    this.selectedArrowId = selectedId;
    this.onArrowSelected({ arrow });
  }

  deselectCurrent() {
    if (!this.selectedArrowId) {
      return;
    }

    const previousArrow = this.arrowMap.get(this.selectedArrowId);
    this.selectedArrowId = null;

    if (!previousArrow) {
      return;
    }

    previousArrow.deselect();
    this.onArrowDeselected({ arrow: previousArrow });
  }

  clearSelection() {
    if (!this.selectedArrowId) {
      return;
    }

    const previousArrow = this.arrowMap.get(this.selectedArrowId);
    this.selectedArrowId = null;

    if (!previousArrow) {
      return;
    }

    previousArrow.deselect();
  }

  dispose() {
    this.container.removeEventListener("pointerdown", this.handlePointerDown);
    this.arrowMap.clear();
    this.selectedArrowId = null;
  }
}
