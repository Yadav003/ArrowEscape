export class SVGRenderer {
  constructor(container, options = {}) {
    this.container = container;
    this.ns = "http://www.w3.org/2000/svg";
    this.options = {
      maxScaleMobile: typeof options.maxScaleMobile === "number" ? options.maxScaleMobile : 1.12,
      maxScaleTablet: typeof options.maxScaleTablet === "number" ? options.maxScaleTablet : 1.02,
      maxScaleLaptop: typeof options.maxScaleLaptop === "number" ? options.maxScaleLaptop : 0.92,
      maxScaleDesktop: typeof options.maxScaleDesktop === "number" ? options.maxScaleDesktop : 0.82,
      fillRatioMobile: typeof options.fillRatioMobile === "number" ? options.fillRatioMobile : 0.92,
      fillRatioTablet: typeof options.fillRatioTablet === "number" ? options.fillRatioTablet : 0.86,
      fillRatioLaptop: typeof options.fillRatioLaptop === "number" ? options.fillRatioLaptop : 0.78,
      fillRatioDesktop: typeof options.fillRatioDesktop === "number" ? options.fillRatioDesktop : 0.7,
    };
  }

  createSVG() {
    const svg = document.createElementNS(this.ns, "svg");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.classList.add("board-svg");
    svg.innerHTML = this.createMarkerDefs();
    return svg;
  }

  createMarkerDefs() {
    return `
      <defs>
        <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
    `;
  }

  getZoomPreset() {
    const width = window.innerWidth;

    if (width < 768) {
      return {
        maxScale: this.options.maxScaleMobile,
        fillRatio: this.options.fillRatioMobile,
      };
    }

    if (width < 1024) {
      return {
        maxScale: this.options.maxScaleTablet,
        fillRatio: this.options.fillRatioTablet,
      };
    }

    if (width < 1440) {
      return {
        maxScale: this.options.maxScaleLaptop,
        fillRatio: this.options.fillRatioLaptop,
      };
    }

    return {
      maxScale: this.options.maxScaleDesktop,
      fillRatio: this.options.fillRatioDesktop,
    };
  }

  render(level, arrows = []) {
    if (!level || !level.board || !Array.isArray(level.paths)) {
      throw new Error("SVGRenderer.render requires a valid level object with board and paths.");
    }

    this.container.innerHTML = "";
    const svg = this.createSVG();
    const contentGroup = document.createElementNS(this.ns, "g");
    svg.appendChild(contentGroup);

    const activeIds = new Set(arrows.map((arrow) => String(arrow.id)));
    const selectedArrowIds = new Set(
      arrows.filter((arrow) => arrow.isSelected).map((arrow) => String(arrow.id))
    );

    const arrowStrokeWidth = 16;
    const arrowPaths = level.paths.filter((item) => activeIds.has(String(item.id)));

    arrowPaths.forEach((item) => {
      const path = document.createElementNS(this.ns, "path");
      path.setAttribute("d", item.path);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", String(arrowStrokeWidth));
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("marker-end", "url(#arrowhead)");
      path.setAttribute("id", `arrow-path-${item.id}`);
      path.classList.add("board-path");
      if (selectedArrowIds.has(String(item.id))) {
        path.classList.add("selected");
      }
      path.dataset.arrowId = item.id;
      contentGroup.appendChild(path);
    });

    this.container.appendChild(svg);

    this.svgRoot = svg;
    this.contentGroup = contentGroup;
    this.currentlySelectedArrowId = null;

    const bounds = this.calculatePathsBoundingBox(arrowPaths);
    const contentWidth = bounds.maxX - bounds.minX || level.board.width || 1;
    const contentHeight = bounds.maxY - bounds.minY || level.board.height || 1;
    const contentX = Number.isFinite(bounds.minX) ? bounds.minX : 0;
    const contentY = Number.isFinite(bounds.minY) ? bounds.minY : 0;

    const padding = 28;
    const paddedWidth = contentWidth + padding * 2;
    const paddedHeight = contentHeight + padding * 2;
    const centerX = contentX + contentWidth / 2;
    const centerY = contentY + contentHeight / 2;

    let viewBoxWidth = paddedWidth;
    let viewBoxHeight = paddedHeight;
    let viewBoxX = centerX - viewBoxWidth / 2;
    let viewBoxY = centerY - viewBoxHeight / 2;

    const containerRect = this.container.getBoundingClientRect();
    if (containerRect.width > 0 && containerRect.height > 0) {
      const preset = this.getZoomPreset();
      const effectiveWidth = containerRect.width * preset.fillRatio;
      const effectiveHeight = containerRect.height * preset.fillRatio;
      const scaleX = effectiveWidth / paddedWidth;
      const scaleY = effectiveHeight / paddedHeight;
      const fitScale = Math.min(scaleX, scaleY);
      const finalScale = Math.min(fitScale, preset.maxScale);

      if (Number.isFinite(finalScale) && finalScale > 0) {
        viewBoxWidth = containerRect.width / finalScale;
        viewBoxHeight = containerRect.height / finalScale;
        viewBoxX = centerX - viewBoxWidth / 2;
        viewBoxY = centerY - viewBoxHeight / 2;
      }
    }

    svg.setAttribute("viewBox", `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
  }

  calculatePathsBoundingBox(paths) {
    const bounds = {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    };

    paths.forEach((item) => {
      const points = this.getPathPoints(item.path);
      points.forEach((point) => {
        bounds.minX = Math.min(bounds.minX, point.x);
        bounds.minY = Math.min(bounds.minY, point.y);
        bounds.maxX = Math.max(bounds.maxX, point.x);
        bounds.maxY = Math.max(bounds.maxY, point.y);
      });
    });

    if (bounds.minX === Infinity) {
      bounds.minX = 0;
      bounds.minY = 0;
      bounds.maxX = 0;
      bounds.maxY = 0;
    }

    return bounds;
  }

  getPathPoints(path) {
    const commands = path.match(/[a-zA-Z][^a-zA-Z]*/g) || [];
    let currentX = 0;
    let currentY = 0;
    const points = [];

    for (const token of commands) {
      const command = token[0].toUpperCase();
      const args = token
        .slice(1)
        .trim()
        .split(/[ ,]+/)
        .filter(Boolean)
        .map(Number);

      if (command === "M" || command === "L") {
        for (let i = 0; i + 1 < args.length; i += 2) {
          currentX = args[i];
          currentY = args[i + 1];
          points.push({ x: currentX, y: currentY });
        }
      } else if (command === "H") {
        args.forEach((x) => {
          currentX = x;
          points.push({ x: currentX, y: currentY });
        });
      } else if (command === "V") {
        args.forEach((y) => {
          currentY = y;
          points.push({ x: currentX, y: currentY });
        });
      }
    }

    if (!points.length) {
      points.push({ x: currentX, y: currentY });
    }

    return points;
  }

  setArrowState(arrowId, state) {
    if (!this.svgRoot) {
      return;
    }

    const path = this.svgRoot.querySelector(`#arrow-path-${CSS.escape(String(arrowId))}`);
    if (!path) {
      return;
    }

    path.classList.remove("selected", "wrong");
    if (state === "selected") {
      path.classList.add("selected");
    } else if (state === "wrong") {
      path.classList.add("wrong");
    }
  }

  clearArrowState(arrowId) {
    this.setArrowState(arrowId, null);
  }
}
