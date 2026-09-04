export class SVGRenderer {
  constructor(container, options = {}) {
    this.container = container;
    this.ns = "http://www.w3.org/2000/svg";
    this.palette = [
      "#3A86FF", // Blue
      "#06D6A0", // Mint Green
      "#FF006E", // Magenta / Pink
      "#8338EC", // Purple
      "#FB5607", // Orange
      "#FFBE0B", // Gold / Amber
      "#00B4D8", // Cyan
      "#7209B7", // Deep Violet
      "#10B981", // Emerald
      "#EC4899", // Rose
    ];
    this.arrowColors = new Map();
  }

  getArrowColor(arrowId, index = 0) {
    if (this.arrowColors.has(String(arrowId))) {
      return this.arrowColors.get(String(arrowId));
    }
    const color = this.palette[index % this.palette.length];
    this.arrowColors.set(String(arrowId), color);
    return color;
  }

  createSVG(boardWidth, boardHeight) {
    const svg = document.createElementNS(this.ns, "svg");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.classList.add("board-svg");
    return svg;
  }

  createDefs(arrows) {
    const defs = document.createElementNS(this.ns, "defs");

    // Static markers for feedback states
    defs.innerHTML = `
      <marker id="marker-wrong" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 1 1 L 9 5 L 1 9 Z" fill="#ef4566" />
      </marker>
      <marker id="marker-selected" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 1 1 L 9 5 L 1 9 Z" fill="#ffd166" />
      </marker>
      <marker id="marker-hint" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 1 1 L 9 5 L 1 9 Z" fill="#ffb703" />
      </marker>
    `;

    // Dynamic marker for each arrow's individual color
    arrows.forEach((arrow, idx) => {
      const color = this.getArrowColor(arrow.id, idx);
      const marker = document.createElementNS(this.ns, "marker");
      marker.setAttribute("id", `marker-${arrow.id}`);
      marker.setAttribute("viewBox", "0 0 10 10");
      marker.setAttribute("refX", "6");
      marker.setAttribute("refY", "5");
      marker.setAttribute("markerWidth", "6");
      marker.setAttribute("markerHeight", "6");
      marker.setAttribute("orient", "auto");

      const path = document.createElementNS(this.ns, "path");
      path.setAttribute("d", "M 1 1 L 9 5 L 1 9 Z");
      path.setAttribute("fill", color);
      marker.appendChild(path);
      defs.appendChild(marker);
    });

    return defs;
  }

  createGridBackground(width, height) {
    const g = document.createElementNS(this.ns, "g");
    g.classList.add("board-grid");

    const spacing = 40;
    const dotRadius = 2.5;

    for (let x = spacing; x < width; x += spacing) {
      for (let y = spacing; y < height; y += spacing) {
        const circle = document.createElementNS(this.ns, "circle");
        circle.setAttribute("cx", String(x));
        circle.setAttribute("cy", String(y));
        circle.setAttribute("r", String(dotRadius));
        circle.classList.add("grid-dot");
        g.appendChild(circle);
      }
    }

    return g;
  }

  render(level, arrows = []) {
    if (!level || !level.board) {
      return;
    }

    this.container.innerHTML = "";
    const svg = this.createSVG(level.board.width, level.board.height);

    const defs = this.createDefs(arrows);
    svg.appendChild(defs);

    const contentGroup = document.createElementNS(this.ns, "g");
    contentGroup.classList.add("board-content");
    svg.appendChild(contentGroup);

    // Background dot matrix
    const grid = this.createGridBackground(level.board.width, level.board.height);
    contentGroup.appendChild(grid);

    const arrowStrokeWidth = 24;
    const activeArrows = arrows.filter((a) => a.isActive && !a.isRemoved);

    activeArrows.forEach((arrow, idx) => {
      const color = this.getArrowColor(arrow.id, idx);

      const group = document.createElementNS(this.ns, "g");
      group.setAttribute("id", `arrow-group-${arrow.id}`);
      group.classList.add("arrow-item");
      group.dataset.arrowId = arrow.id;

      const path = document.createElementNS(this.ns, "path");
      path.setAttribute("d", arrow.path);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", color);
      path.setAttribute("stroke-width", String(arrowStrokeWidth));
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("marker-end", `url(#marker-${arrow.id})`);
      path.setAttribute("id", `arrow-path-${arrow.id}`);
      path.setAttribute("data-direction", arrow.direction);
      path.classList.add("board-path");
      path.dataset.arrowId = arrow.id;

      // Invisible wider hit area for easy touch/mouse tapping
      const hitArea = document.createElementNS(this.ns, "path");
      hitArea.setAttribute("d", arrow.path);
      hitArea.setAttribute("fill", "none");
      hitArea.setAttribute("stroke", "transparent");
      hitArea.setAttribute("stroke-width", String(arrowStrokeWidth + 24));
      hitArea.setAttribute("stroke-linecap", "round");
      hitArea.setAttribute("stroke-linejoin", "round");
      hitArea.classList.add("hit-path");
      hitArea.dataset.arrowId = arrow.id;

      group.appendChild(hitArea);
      group.appendChild(path);
      contentGroup.appendChild(group);
    });

    this.container.appendChild(svg);
    this.svgRoot = svg;
    this.contentGroup = contentGroup;

    // Calculate viewbox to fit board neatly
    const padding = 36;
    const vbWidth = level.board.width + padding * 2;
    const vbHeight = level.board.height + padding * 2;
    const vbX = -padding;
    const vbY = -padding;

    svg.setAttribute("viewBox", `${vbX} ${vbY} ${vbWidth} ${vbHeight}`);
  }

  setArrowState(arrowId, state) {
    if (!this.svgRoot) return;

    const path = this.svgRoot.querySelector(`#arrow-path-${CSS.escape(String(arrowId))}`);
    if (!path) return;

    path.classList.remove("selected", "wrong", "hint-active");

    if (state === "selected") {
      path.classList.add("selected");
      path.setAttribute("stroke", "#ffd166");
      path.setAttribute("marker-end", "url(#marker-selected)");
      path.style.filter = "drop-shadow(0 0 10px rgba(255, 209, 102, 0.9))";
    } else if (state === "wrong") {
      path.classList.add("wrong");
      path.setAttribute("stroke", "#ef4566");
      path.setAttribute("marker-end", "url(#marker-wrong)");
      path.style.filter = "drop-shadow(0 0 10px rgba(239, 69, 102, 0.9))";
    } else if (state === "hint") {
      path.classList.add("hint-active");
      path.setAttribute("stroke", "#ffb703");
      path.setAttribute("marker-end", "url(#marker-hint)");
      path.style.filter = "drop-shadow(0 0 12px rgba(255, 183, 3, 0.95))";
    } else {
      const origColor = this.arrowColors.get(String(arrowId)) || "#3A86FF";
      path.setAttribute("stroke", origColor);
      path.setAttribute("marker-end", `url(#marker-${arrowId})`);
      path.style.filter = "";
    }
  }

  clearArrowState(arrowId) {
    this.setArrowState(arrowId, null);
  }
}
