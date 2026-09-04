// ==========================================
// ARROW ESCAPE - COMPLETE GAME ENGINE
// Works via file:/// and http:// seamlessly
// ==========================================

(function () {
  "use strict";

  // ------------------------------------------
  // 1. EMBEDDED LEVELS (100% Solvable & Calibrated)
  // ------------------------------------------
  const EMBEDDED_LEVELS = {
    1: {
      id: 1,
      name: "Level 1 - First Steps",
      board: { width: 600, height: 600 },
      paths: [
        { id: "a1", path: "M 150 150 H 300 V 220 H 480" },
        { id: "a2", path: "M 300 300 V 420 H 480" },
        { id: "a3", path: "M 150 420 H 220 V 300" }
      ]
    },
    2: {
      id: 2,
      name: "Level 2 - Clear the Path",
      board: { width: 700, height: 700 },
      paths: [
        { id: "b1", path: "M 180 180 H 300 V 450" },
        { id: "b2", path: "M 520 320 H 380" },
        { id: "b3", path: "M 520 180 V 260 H 380" },
        { id: "b4", path: "M 180 480 H 320 V 580" }
      ]
    },
    3: {
      id: 3,
      name: "Level 3 - Corner Escape",
      board: { width: 800, height: 800 },
      paths: [
        { id: "c1", path: "M 200 160 H 350 V 240 H 650" },
        { id: "c2", path: "M 400 120 V 200 H 280" },
        { id: "c3", path: "M 200 320 V 440 H 340" },
        { id: "c4", path: "M 500 280 V 480" },
        { id: "c5", path: "M 650 380 H 450" },
        { id: "c6", path: "M 240 540 H 440 V 660" },
        { id: "c7", path: "M 560 540 V 640 H 700" },
        { id: "c8", path: "M 350 720 H 150" }
      ]
    },
    4: {
      id: 4,
      name: "Level 4 - The Maze",
      board: { width: 1000, height: 1200 },
      paths: [
        { id: "d1", path: "M80 100 H260 V220 H360" },
        { id: "d2", path: "M420 80 V220 H520" },
        { id: "d3", path: "M600 120 H760 V220 H840" },
        { id: "d4", path: "M900 100 V220 H960" },
        { id: "d5", path: "M120 300 H260 V400" },
        { id: "d6", path: "M420 260 V400 H520" },
        { id: "d7", path: "M620 300 H760 V400 H820" },
        { id: "d8", path: "M880 260 V400 H940" },
        { id: "d9", path: "M80 500 H260 V600 H340" },
        { id: "d10", path: "M420 440 V600 H520" },
        { id: "d11", path: "M620 520 H760 V600" },
        { id: "d12", path: "M880 500 V620 H940" },
        { id: "d13", path: "M120 700 H300 V800" },
        { id: "d14", path: "M420 660 V800 H520" },
        { id: "d15", path: "M620 720 H760 V800 H820" },
        { id: "d16", path: "M900 700 V820 H960" },
        { id: "d17", path: "M80 900 H260 V1000" },
        { id: "d18", path: "M420 860 V1000 H520" },
        { id: "d19", path: "M620 900 H760 V1000 H840" },
        { id: "d20", path: "M880 860 V1000 H940" }
      ]
    },
    5: {
      id: 5,
      name: "Level 5 - Labyrinth",
      board: { width: 1000, height: 1300 },
      paths: [
        { id: "e1", path: "M80 100 H260 V220 H360" },
        { id: "e2", path: "M420 80 V220 H520" },
        { id: "e3", path: "M600 120 H760 V240" },
        { id: "e4", path: "M880 100 V220 H960" },
        { id: "e5", path: "M120 300 H260 V420" },
        { id: "e6", path: "M420 280 V400 H520" },
        { id: "e7", path: "M620 320 H760 V420 H840" },
        { id: "e8", path: "M920 300 V420 H980" },
        { id: "e9", path: "M80 520 H260 V640 H360" },
        { id: "e10", path: "M420 500 V640 H520" },
        { id: "e11", path: "M620 540 H760 V660" },
        { id: "e12", path: "M880 520 V660 H960" },
        { id: "e13", path: "M120 720 H300 V840" },
        { id: "e14", path: "M440 720 V840 H540" },
        { id: "e15", path: "M640 740 H800 V860" },
        { id: "e16", path: "M900 740 V860 H980" },
        { id: "e17", path: "M80 940 H260 V1060" },
        { id: "e18", path: "M420 920 V1060 H520" },
        { id: "e19", path: "M620 940 H760 V1060 H840" },
        { id: "e20", path: "M880 940 V1080 H960" },
        { id: "e21", path: "M160 1160 H320" },
        { id: "e22", path: "M520 1120 V1240" }
      ]
    },
    6: {
      id: 6,
      name: "Level 6 - Master Challenge",
      board: { width: 1100, height: 1400 },
      paths: [
        { id: "f1", path: "M100 100 H280 V240 H380" },
        { id: "f2", path: "M440 100 V240 H540" },
        { id: "f3", path: "M640 120 H800 V240 H900" },
        { id: "f4", path: "M980 120 V260 H1060" },
        { id: "f5", path: "M140 320 H280 V440" },
        { id: "f6", path: "M440 300 V440 H540" },
        { id: "f7", path: "M660 340 H800 V440 H880" },
        { id: "f8", path: "M980 320 V460 H1060" },
        { id: "f9", path: "M100 540 H280 V660 H380" },
        { id: "f10", path: "M440 520 V660 H540" },
        { id: "f11", path: "M660 560 H820 V680" },
        { id: "f12", path: "M980 540 V680 H1060" },
        { id: "f13", path: "M140 760 H300 V880" },
        { id: "f14", path: "M460 760 V880 H560" },
        { id: "f15", path: "M680 760 H840 V880 H920" },
        { id: "f16", path: "M1000 760 V900 H1080" },
        { id: "f17", path: "M100 980 H280 V1100" },
        { id: "f18", path: "M440 960 V1100 H540" },
        { id: "f19", path: "M680 980 H820 V1100 H920" },
        { id: "f20", path: "M1000 980 V1120 H1080" },
        { id: "f21", path: "M160 1200 H340" },
        { id: "f22", path: "M560 1200 V1300 H620" },
        { id: "f23", path: "M760 1220 H940" },
        { id: "f24", path: "M1040 1180 V1320" }
      ]
    }
  };

  // ------------------------------------------
  // 2. ARROW CLASS
  // ------------------------------------------
  class Arrow {
    constructor({ id, path = "" }) {
      this.id = String(id);
      this.path = String(path || "").trim();
      this.isSelected = false;
      this.isActive = true;
      this.isRemoved = false;
      this.points = this.getPathPoints();
      this.headPoint = this.points[this.points.length - 1] || { x: 0, y: 0 };
      this.direction = this.determineDirection();
    }

    determineDirection() {
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
      return "RIGHT";
    }

    getPathPoints() {
      if (this._pathPoints) return this._pathPoints;
      const commands = this.path.match(/[a-zA-Z][^a-zA-Z]*/g) || [];
      let cx = 0, cy = 0;
      const pts = [];

      for (const token of commands) {
        const cmd = token[0].toUpperCase();
        const args = token.slice(1).trim().split(/[,\s]+/).filter(Boolean).map(Number);
        if (cmd === "M" || cmd === "L") {
          for (let i = 0; i + 1 < args.length; i += 2) {
            cx = args[i]; cy = args[i + 1];
            pts.push({ x: cx, y: cy });
          }
        } else if (cmd === "H") {
          for (const x of args) {
            cx = x;
            pts.push({ x: cx, y: cy });
          }
        } else if (cmd === "V") {
          for (const y of args) {
            cy = y;
            pts.push({ x: cx, y: cy });
          }
        }
      }
      if (!pts.length) pts.push({ x: cx, y: cy });
      this._pathPoints = pts;
      return pts;
    }

    getSegments() {
      if (this._segments) return this._segments;
      const pts = this.getPathPoints();
      const segs = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        segs.push({
          p1,
          p2,
          minX: Math.min(p1.x, p2.x),
          maxX: Math.max(p1.x, p2.x),
          minY: Math.min(p1.y, p2.y),
          maxY: Math.max(p1.y, p2.y),
          isHorizontal: Math.abs(p1.y - p2.y) < 0.5,
          isVertical: Math.abs(p1.x - p2.x) < 0.5
        });
      }
      this._segments = segs;
      return segs;
    }
  }

  // ------------------------------------------
  // 3. MOVEMENT ENGINE (Precise 2D Ray Collision)
  // ------------------------------------------
  class MovementEngine {
    constructor(board, arrows = []) {
      this.board = board;
      this.arrows = arrows;
      this.tolerance = 14;
    }

    setArrows(arrows = []) {
      this.arrows = arrows;
    }

    analyze(arrowId) {
      const arrow = this.arrows.find((a) => String(a.id) === String(arrowId));
      if (!arrow) throw new Error(`Arrow ${arrowId} not found`);

      const dir = arrow.direction;
      const head = arrow.headPoint;
      const blocker = this.findClosestBlocker(arrow, head, dir);
      const canMove = blocker == null;
      const boundaryDist = this.distanceToBoundary(head, dir);

      return {
        arrowId: arrow.id,
        direction: dir,
        canMove,
        blockingArrowId: blocker ? blocker.arrow.id : null,
        travelDistance: canMove ? boundaryDist + 200 : Math.max(0, blocker.distance)
      };
    }

    findClosestBlocker(targetArrow, head, dir) {
      const active = this.arrows.filter(
        (a) => a.isActive && !a.isRemoved && String(a.id) !== String(targetArrow.id)
      );
      let closest = null;

      for (const arrow of active) {
        for (const seg of arrow.getSegments()) {
          const hit = this.rayIntersectSegment(head, dir, seg);
          if (hit !== null && hit.distance > 0.5) {
            if (!closest || hit.distance < closest.distance) {
              closest = { arrow, distance: hit.distance };
            }
          }
        }
      }
      return closest;
    }

    rayIntersectSegment(head, dir, seg) {
      const tol = this.tolerance;
      const minX = seg.minX, maxX = seg.maxX;
      const minY = seg.minY, maxY = seg.maxY;

      if (dir === "RIGHT") {
        if (seg.isVertical) {
          if (seg.p1.x > head.x + 2 && head.y >= minY - tol && head.y <= maxY + tol) {
            return { distance: seg.p1.x - head.x };
          }
        } else if (seg.isHorizontal) {
          if (Math.abs(seg.p1.y - head.y) <= tol && maxX > head.x + 2) {
            return { distance: Math.max(0, minX - head.x) };
          }
        }
      } else if (dir === "LEFT") {
        if (seg.isVertical) {
          if (seg.p1.x < head.x - 2 && head.y >= minY - tol && head.y <= maxY + tol) {
            return { distance: head.x - seg.p1.x };
          }
        } else if (seg.isHorizontal) {
          if (Math.abs(seg.p1.y - head.y) <= tol && minX < head.x - 2) {
            return { distance: Math.max(0, head.x - maxX) };
          }
        }
      } else if (dir === "DOWN") {
        if (seg.isHorizontal) {
          if (seg.p1.y > head.y + 2 && head.x >= minX - tol && head.x <= maxX + tol) {
            return { distance: seg.p1.y - head.y };
          }
        } else if (seg.isVertical) {
          if (Math.abs(seg.p1.x - head.x) <= tol && maxY > head.y + 2) {
            return { distance: Math.max(0, minY - head.y) };
          }
        }
      } else if (dir === "UP") {
        if (seg.isHorizontal) {
          if (seg.p1.y < head.y - 2 && head.x >= minX - tol && head.x <= maxX + tol) {
            return { distance: head.y - seg.p1.y };
          }
        } else if (seg.isVertical) {
          if (Math.abs(seg.p1.x - head.x) <= tol && minY < head.y - 2) {
            return { distance: Math.max(0, head.y - maxY) };
          }
        }
      }
      return null;
    }

    distanceToBoundary(head, dir) {
      if (dir === "RIGHT") return Math.max(0, this.board.width - head.x);
      if (dir === "LEFT") return Math.max(0, head.x);
      if (dir === "DOWN") return Math.max(0, this.board.height - head.y);
      if (dir === "UP") return Math.max(0, head.y);
      return 0;
    }
  }

  // ------------------------------------------
  // 4. AUDIO SYNTHESIZER (Native Web Audio)
  // ------------------------------------------
  class AudioManager {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      try {
        const saved = localStorage.getItem("arrow_escape_sound");
        if (saved !== null) this.enabled = saved === "true";
      } catch (e) {}
    }

    initContext() {
      if (!this.ctx && typeof window !== "undefined") {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    toggleSound() {
      this.enabled = !this.enabled;
      try {
        localStorage.setItem("arrow_escape_sound", String(this.enabled));
      } catch (e) {}
      return this.enabled;
    }

    playClick() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.frequency.setValueAtTime(700, t);
      osc.frequency.exponentialRampToValueAtTime(350, t + 0.04);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    }

    playEscape() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(720, t + 0.16);
      osc.frequency.exponentialRampToValueAtTime(980, t + 0.28);
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.32);
    }

    playBlocked() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.13);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.14);
    }

    playLevelComplete() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.11;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.14, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + (idx === notes.length - 1 ? 0.6 : 0.2));
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + (idx === notes.length - 1 ? 0.65 : 0.25));
      });
    }
  }

  // ------------------------------------------
  // 5. SVG BOARD RENDERER (Clean Geometrical Arrowheads)
  // ------------------------------------------
  class SVGRenderer {
    constructor(container) {
      this.container = container;
      this.ns = "http://www.w3.org/2000/svg";
      this.palette = [
        "#3A86FF", // Vibrant Blue
        "#06D6A0", // Mint Emerald
        "#FF006E", // Hot Magenta
        "#8338EC", // Vivid Purple
        "#FB5607", // Electric Orange
        "#FFBE0B", // Amber Gold
        "#00B4D8", // Sky Cyan
        "#7209B7"  // Royal Violet
      ];
      this.arrowColors = new Map();
    }

    getArrowColor(arrowId, idx = 0) {
      if (this.arrowColors.has(String(arrowId))) {
        return this.arrowColors.get(String(arrowId));
      }
      const c = this.palette[idx % this.palette.length];
      this.arrowColors.set(String(arrowId), c);
      return c;
    }

    getArrowheadPoints(head, direction) {
      const hx = head.x;
      const hy = head.y;
      const b = 24; // Base half-width
      const l = 32; // Length

      if (direction === "RIGHT") {
        return `${hx - l},${hy - b} ${hx + 6},${hy} ${hx - l},${hy + b}`;
      } else if (direction === "LEFT") {
        return `${hx + l},${hy - b} ${hx - 6},${hy} ${hx + l},${hy + b}`;
      } else if (direction === "DOWN") {
        return `${hx - b},${hy - l} ${hx},${hy + 6} ${hx + b},${hy - l}`;
      } else if (direction === "UP") {
        return `${hx - b},${hy + l} ${hx},${hy - 6} ${hx + b},${hy + l}`;
      }
      return `${hx - l},${hy - b} ${hx + 6},${hy} ${hx - l},${hy + b}`;
    }

    createGridBackground(w, h) {
      const g = document.createElementNS(this.ns, "g");
      g.classList.add("board-grid");
      const spacing = 40;
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          const c = document.createElementNS(this.ns, "circle");
          c.setAttribute("cx", String(x));
          c.setAttribute("cy", String(y));
          c.setAttribute("r", "2.5");
          c.classList.add("grid-dot");
          g.appendChild(c);
        }
      }
      return g;
    }

    render(level, arrows = []) {
      this.container.innerHTML = "";
      const w = level.board.width;
      const h = level.board.height;

      const svg = document.createElementNS(this.ns, "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.classList.add("board-svg");

      const padding = 36;
      svg.setAttribute("viewBox", `${-padding} ${-padding} ${w + padding * 2} ${h + padding * 2}`);

      const contentGroup = document.createElementNS(this.ns, "g");
      contentGroup.classList.add("board-content");

      // Grid dots
      contentGroup.appendChild(this.createGridBackground(w, h));

      const active = arrows.filter((a) => a.isActive && !a.isRemoved);
      active.forEach((arrow, idx) => {
        const color = this.getArrowColor(arrow.id, idx);

        const group = document.createElementNS(this.ns, "g");
        group.setAttribute("id", `arrow-group-${arrow.id}`);
        group.classList.add("arrow-item");
        group.dataset.arrowId = arrow.id;

        // Path line
        const pathEl = document.createElementNS(this.ns, "path");
        pathEl.setAttribute("d", arrow.path);
        pathEl.setAttribute("fill", "none");
        pathEl.setAttribute("stroke", color);
        pathEl.setAttribute("stroke-width", "26");
        pathEl.setAttribute("stroke-linecap", "round");
        pathEl.setAttribute("stroke-linejoin", "round");
        pathEl.setAttribute("id", `arrow-path-${arrow.id}`);
        pathEl.classList.add("board-path");
        pathEl.dataset.arrowId = arrow.id;

        // Integrated triangular arrowhead (Reference: ChatGPT image)
        const headPoints = this.getArrowheadPoints(arrow.headPoint, arrow.direction);
        const headEl = document.createElementNS(this.ns, "polygon");
        headEl.setAttribute("points", headPoints);
        headEl.setAttribute("fill", color);
        headEl.setAttribute("stroke", color);
        headEl.setAttribute("stroke-width", "4");
        headEl.setAttribute("stroke-linejoin", "round");
        headEl.setAttribute("id", `arrow-head-${arrow.id}`);
        headEl.classList.add("board-head");
        headEl.dataset.arrowId = arrow.id;

        // Enlarged invisible touch hit area
        const hitEl = document.createElementNS(this.ns, "path");
        hitEl.setAttribute("d", arrow.path);
        hitEl.setAttribute("fill", "none");
        hitEl.setAttribute("stroke", "transparent");
        hitEl.setAttribute("stroke-width", "54");
        hitEl.setAttribute("stroke-linecap", "round");
        hitEl.setAttribute("stroke-linejoin", "round");
        hitEl.classList.add("hit-path");
        hitEl.dataset.arrowId = arrow.id;

        group.appendChild(hitEl);
        group.appendChild(pathEl);
        group.appendChild(headEl);
        contentGroup.appendChild(group);
      });

      svg.appendChild(contentGroup);
      this.container.appendChild(svg);
      this.svgRoot = svg;
    }

    setArrowState(arrowId, state) {
      if (!this.svgRoot) return;
      const pathEl = this.svgRoot.querySelector(`#arrow-path-${CSS.escape(String(arrowId))}`);
      const headEl = this.svgRoot.querySelector(`#arrow-head-${CSS.escape(String(arrowId))}`);
      if (!pathEl || !headEl) return;

      pathEl.classList.remove("selected", "wrong", "hint-active");
      headEl.classList.remove("selected", "wrong", "hint-active");

      if (state === "selected") {
        pathEl.classList.add("selected");
        pathEl.setAttribute("stroke", "#ffd166");
        headEl.setAttribute("fill", "#ffd166");
        headEl.setAttribute("stroke", "#ffd166");
        pathEl.style.filter = "drop-shadow(0 0 10px rgba(255, 209, 102, 0.9))";
      } else if (state === "wrong") {
        pathEl.classList.add("wrong");
        pathEl.setAttribute("stroke", "#ef4566");
        headEl.setAttribute("fill", "#ef4566");
        headEl.setAttribute("stroke", "#ef4566");
        pathEl.style.filter = "drop-shadow(0 0 10px rgba(239, 69, 102, 0.9))";
      } else if (state === "hint") {
        pathEl.classList.add("hint-active");
        pathEl.setAttribute("stroke", "#ffb703");
        headEl.setAttribute("fill", "#ffb703");
        headEl.setAttribute("stroke", "#ffb703");
        pathEl.style.filter = "drop-shadow(0 0 14px rgba(255, 183, 3, 0.95))";
      } else {
        const orig = this.arrowColors.get(String(arrowId)) || "#3A86FF";
        pathEl.setAttribute("stroke", orig);
        headEl.setAttribute("fill", orig);
        headEl.setAttribute("stroke", orig);
        pathEl.style.filter = "";
      }
    }

    clearArrowState(arrowId) {
      this.setArrowState(arrowId, null);
    }
  }

  // ------------------------------------------
  // 6. ANIMATION MANAGER
  // ------------------------------------------
  class AnimationManager {
    constructor() {
      this.isAnimating = false;
    }

    animateMovement(element, direction, distance) {
      if (!element) return Promise.resolve();
      this.isAnimating = true;

      const duration = 300;
      const travel = Math.max(distance, 500);
      const start = performance.now();
      const unit = this.getUnit(direction);

      return new Promise((resolve) => {
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = Math.pow(p, 1.8);
          const dist = travel * eased;

          element.setAttribute("transform", `translate(${unit.x * dist} ${unit.y * dist})`);
          element.style.opacity = String(Math.max(0, 1 - p * 0.8));

          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            this.isAnimating = false;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    }

    animateBlocked(element, direction) {
      if (!element) return Promise.resolve();
      this.isAnimating = true;

      const duration = 180;
      const start = performance.now();
      const unit = this.getUnit(direction);

      return new Promise((resolve) => {
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const factor = Math.sin(p * Math.PI * 1.5) * Math.exp(-p * 2.5);
          const shift = 14 * factor;

          element.setAttribute("transform", `translate(${unit.x * shift} ${unit.y * shift})`);

          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            element.removeAttribute("transform");
            this.isAnimating = false;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    }

    getUnit(direction) {
      if (direction === "RIGHT") return { x: 1, y: 0 };
      if (direction === "LEFT") return { x: -1, y: 0 };
      if (direction === "DOWN") return { x: 0, y: 1 };
      if (direction === "UP") return { x: 0, y: -1 };
      return { x: 1, y: 0 };
    }
  }

  // ------------------------------------------
  // 7. GAME CONTROLLER & DOM INITIALIZATION
  // ------------------------------------------
  let currentLevelNum = 1;
  let currentLevelData = null;
  let activeArrows = [];
  let lives = 3;
  let remainingHints = 3;

  const audio = new AudioManager();
  const animator = new AnimationManager();
  let renderer = null;
  let movementEngine = null;
  let isLocked = false;

  function loadLevel(lvlNum) {
    currentLevelNum = lvlNum;
    currentLevelData = EMBEDDED_LEVELS[lvlNum] || EMBEDDED_LEVELS[1];
    activeArrows = currentLevelData.paths.map((p) => new Arrow(p));
    movementEngine = new MovementEngine(currentLevelData.board, activeArrows);
    lives = 3;
    remainingHints = 3;
    isLocked = false;

    updateUI();
    renderer.render(currentLevelData, activeArrows);
  }

  function updateUI() {
    // Level Badge
    const badge = document.getElementById("levelBadge");
    if (badge && currentLevelData) {
      badge.textContent = currentLevelData.name || `Level ${currentLevelNum}`;
    }

    // Hearts
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach((h, idx) => {
      if (idx < lives) {
        h.classList.remove("lost");
      } else {
        h.classList.add("lost");
      }
    });

    // Hint Badge
    const hintBadge = document.getElementById("hintBadge");
    if (hintBadge) {
      hintBadge.textContent = String(remainingHints);
    }
  }

  function showToast(text, isSuccess = false) {
    const msg = document.getElementById("gameMessage");
    if (!msg) return;
    msg.textContent = text;
    msg.classList.toggle("success", Boolean(isSuccess));
    msg.classList.add("show");
    window.setTimeout(() => msg.classList.remove("show"), 1500);
  }

  function handleArrowClick(arrowId) {
    if (isLocked || lives <= 0) return;
    const arrow = activeArrows.find((a) => String(a.id) === String(arrowId));
    if (!arrow || !arrow.isActive) return;

    movementEngine.setArrows(activeArrows);
    const analysis = movementEngine.analyze(arrow.id);
    const groupEl = document.getElementById(`arrow-group-${arrow.id}`);
    if (!groupEl) return;

    isLocked = true;

    if (analysis.canMove) {
      audio.playEscape();
      renderer.setArrowState(arrow.id, "selected");

      animator.animateMovement(groupEl, arrow.direction, analysis.travelDistance).then(() => {
        arrow.isActive = false;
        arrow.isRemoved = true;
        groupEl.remove();

        activeArrows = activeArrows.filter((a) => a.id !== arrow.id);
        movementEngine.setArrows(activeArrows);
        isLocked = false;

        // Check Victory
        if (activeArrows.length === 0) {
          audio.playLevelComplete();
          const overlay = document.getElementById("levelCompleteOverlay");
          const title = document.getElementById("levelCompleteTitle");
          if (title) title.textContent = `🎉 ${currentLevelData.name} Complete!`;
          if (overlay) overlay.classList.remove("hidden");
        }
      });
    } else {
      audio.playBlocked();
      renderer.setArrowState(arrow.id, "wrong");
      lives = Math.max(0, lives - 1);
      updateUI();
      showToast("Blocked arrow! -1 ❤", false);

      animator.animateBlocked(groupEl, arrow.direction).then(() => {
        renderer.clearArrowState(arrow.id);
        isLocked = false;

        // Check Game Over
        if (lives <= 0) {
          const overlay = document.getElementById("gameOverOverlay");
          if (overlay) overlay.classList.remove("hidden");
        }
      });
    }
  }

  function provideHint() {
    if (remainingHints <= 0) {
      showToast("No hints left for this level!");
      return;
    }
    movementEngine.setArrows(activeArrows);
    const free = activeArrows.filter((a) => movementEngine.analyze(a.id).canMove);
    if (free.length === 0) {
      showToast("No free arrows available!");
      return;
    }

    const hintArrow = free[0];
    remainingHints--;
    updateUI();
    audio.playClick();
    showToast("Found a free arrow! 💡", true);
    renderer.setArrowState(hintArrow.id, "hint");
    window.setTimeout(() => renderer.clearArrowState(hintArrow.id), 1400);
  }

  // DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("svgContainer");
    renderer = new SVGRenderer(container);

    // Pointer event delegation for arrows
    container.addEventListener("pointerdown", (e) => {
      const target = e.target.closest("[data-arrow-id]");
      if (!target) return;
      const arrowId = target.dataset.arrowId;
      if (arrowId) handleArrowClick(arrowId);
    });

    // Sound toggle
    const soundButton = document.getElementById("soundButton");
    const soundIcon = document.getElementById("soundIcon");
    function updateSoundIcon() {
      if (soundIcon) {
        soundIcon.src = audio.enabled ? "assets/sound-on.svg" : "assets/sound-off.svg";
      }
    }
    updateSoundIcon();
    soundButton.addEventListener("click", () => {
      audio.toggleSound();
      updateSoundIcon();
      audio.playClick();
    });

    // Theme toggle
    const themeButton = document.getElementById("themeButton");
    const themeIcon = document.getElementById("themeIcon");
    let theme = "light";
    try {
      theme = localStorage.getItem("arrow_escape_theme") || "light";
    } catch (e) {}

    function applyTheme(t) {
      theme = t;
      document.body.dataset.theme = t;
      if (themeIcon) {
        themeIcon.src = t === "dark" ? "assets/theme-sun.svg" : "assets/theme-moon.svg";
      }
      try {
        localStorage.setItem("arrow_escape_theme", t);
      } catch (e) {}
    }
    applyTheme(theme);

    themeButton.addEventListener("click", () => {
      applyTheme(theme === "light" ? "dark" : "light");
      audio.playClick();
    });

    // Hint button
    document.getElementById("hintButton").addEventListener("click", () => {
      provideHint();
    });

    // Restart button
    document.getElementById("restartButton").addEventListener("click", () => {
      audio.playClick();
      loadLevel(currentLevelNum);
    });

    // Back button
    document.getElementById("backButton").addEventListener("click", () => {
      audio.playClick();
      loadLevel(Math.max(1, currentLevelNum - 1));
    });

    // Modals
    document.getElementById("retryOverlayButton").addEventListener("click", () => {
      document.getElementById("gameOverOverlay").classList.add("hidden");
      audio.playClick();
      loadLevel(currentLevelNum);
    });

    document.getElementById("nextLevelButton").addEventListener("click", () => {
      document.getElementById("levelCompleteOverlay").classList.add("hidden");
      audio.playClick();
      let nextLvl = currentLevelNum + 1;
      if (nextLvl > 6) nextLvl = 1;
      loadLevel(nextLvl);
    });

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.key === "r" || e.key === "R") loadLevel(currentLevelNum);
      if (e.key === "h" || e.key === "H") provideHint();
      if (e.key === "m" || e.key === "M") soundButton.click();
    });

    // Resize
    window.addEventListener("resize", () => {
      if (currentLevelData) {
        renderer.render(currentLevelData, activeArrows);
      }
    });

    // Load Level 1
    loadLevel(1);
  });
})();
