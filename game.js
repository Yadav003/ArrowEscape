// ==========================================
// ARROW ESCAPE - COMPLETE GAME ENGINE
// Features: Slithering Tail Escape Animation,
// Interlocking Puzzles, Web Audio & Touch Controls
// ==========================================

(function () {
  "use strict";

  // ------------------------------------------
  // 1. EMBEDDED LEVELS (Interlocking & 100% Solvable)
  // ------------------------------------------
  const EMBEDDED_LEVELS = {
    1: {
      id: 1,
      name: "Level 1 - Classic Loop",
      board: { width: 500, height: 600 },
      paths: [
        { id: "yellow", path: "M 80 480 V 540 H 420 V 70 H 260 V 380 H 220 V 60", color: "#FFB703" },
        { id: "orange", path: "M 320 440 V 160", color: "#FB8500" },
        { id: "green",  path: "M 170 200 V 340 H 130 V 160 H 180", color: "#52B788" },
        { id: "cyan",   path: "M 170 420 H 250 V 460 H 360 V 180 H 340 V 140 H 370", color: "#2EC4B6" },
        { id: "purple", path: "M 160 120 H 90 V 420 H 130 V 480 H 250", color: "#9D4EDD" }
      ]
    },
    2: {
      id: 2,
      name: "Level 2 - The Swirl",
      board: { width: 600, height: 620 },
      paths: [
        { id: "top_cyan_u", path: "M 480 180 V 70 H 530 V 140", color: "#00B4D8" },
        { id: "bot_cyan_v", path: "M 150 480 V 550", color: "#00B4D8" },
        { id: "top_purple", path: "M 220 80 H 70 V 210", color: "#8338EC" },
        { id: "green_u1",   path: "M 110 210 H 190 V 170 H 130", color: "#06D6A0" },
        { id: "orange_top", path: "M 120 130 H 420 V 70 H 460 V 170 H 330", color: "#FB5607" },
        { id: "yellow_mid", path: "M 380 210 H 330", color: "#FFBE0B" },
        { id: "pink_mid",   path: "M 240 180 H 270 V 250 H 420 V 220 H 530 V 250", color: "#FF006E" },
        { id: "cyan_mid",   path: "M 530 410 V 290 H 260 V 330 H 480", color: "#00B4D8" },
        { id: "purple_v",   path: "M 200 370 V 240", color: "#8338EC" },
        { id: "orange_l",   path: "M 70 340 V 520 H 110 V 260 H 140 V 340", color: "#FB5607" },
        { id: "yellow_bot", path: "M 70 560 H 200 V 440 H 240 V 470", color: "#FFBE0B" },
        { id: "orange_s1",  path: "M 250 500 H 340", color: "#FB5607" },
        { id: "yellow_u",   path: "M 530 520 H 430 V 480 H 540", color: "#FFBE0B" },
        { id: "green_bot",  path: "M 530 560 H 250 V 530 H 380", color: "#06D6A0" },
        { id: "purple_mid", path: "M 500 390 H 360 V 440 H 480 V 420 H 380 V 370 H 460", color: "#8338EC" },
        { id: "pink_hook",  path: "M 250 370 H 280 V 410", color: "#FF006E" }
      ]
    },
    3: {
      id: 3,
      name: "Level 3 - Labyrinth Maze",
      board: { width: 600, height: 640 },
      paths: [
        { id: "top_bar_left", path: "M 200 110 H 50", color: "#FFBE0B" },
        { id: "top_border_hook", path: "M 50 60 H 260 V 110 H 210", color: "#FB5607" },
        { id: "top_exit_up", path: "M 220 200 V 230 H 260 V 150 H 350 V 100 H 310 V 40", color: "#06D6A0" },
        { id: "top_right_hook", path: "M 360 60 H 550 V 110 H 460", color: "#00B4D8" },
        { id: "upper_right_down", path: "M 410 140 V 180 H 440 V 220", color: "#8338EC" },
        { id: "right_top_hook", path: "M 510 220 V 150 H 550 V 240", color: "#FF006E" },
        { id: "right_col_up", path: "M 510 320 H 460 V 160", color: "#3A86FF" },
        { id: "u_turn_mid", path: "M 310 260 V 200 H 360 V 250", color: "#F77F00" },
        { id: "left_col_up", path: "M 50 250 V 130", color: "#2EC4B6" },
        { id: "left_inner_corner", path: "M 180 160 H 100 V 290 H 150", color: "#9D4EDD" },
        { id: "left_small_hook", path: "M 190 290 V 240 H 140 V 210 H 190", color: "#FFBE0B" },
        { id: "vert_mid_left_up", path: "M 220 360 V 250", color: "#FB5607" },
        { id: "red_arrow", path: "M 400 400 V 370 H 260 V 240", color: "#E63946" },
        { id: "green_arrow", path: "M 440 230 V 330 H 300", color: "#2A9D8F" },
        { id: "left_mid_bar", path: "M 170 340 H 90", color: "#7209B7" },
        { id: "left_col_mid_up", path: "M 50 460 V 320", color: "#06D6A0" },
        { id: "step_below_red", path: "M 370 410 H 220 V 460", color: "#00B4D8" },
        { id: "bot_mid_left", path: "M 390 450 H 220", color: "#FF006E" },
        { id: "bot_right_snake", path: "M 440 490 H 310 V 530 H 400", color: "#3A86FF" },
        { id: "bot_right_v1", path: "M 450 370 V 550", color: "#FFBE0B" },
        { id: "bot_right_v2", path: "M 490 580 V 390", color: "#FB5607" },
        { id: "bot_right_v3", path: "M 530 360 V 590", color: "#8338EC" },
        { id: "bot_left_loop", path: "M 100 480 V 400 H 180 V 540 H 350 V 580 H 420", color: "#06D6A0" },
        { id: "bot_left_up", path: "M 50 580 V 480", color: "#FF006E" },
        { id: "bot_left_exit", path: "M 270 580 H 90", color: "#2EC4B6" }
      ]
    },
    4: {
      id: 4,
      name: "Level 4 - Heart Maze",
      board: { width: 680, height: 680 },
      paths: [
        { id: "h1", path: "M 110 240 V 140 H 170 V 210", color: "#06D6A0" },
        { id: "h2", path: "M 170 140 H 260 V 110 H 190", color: "#8338EC" },
        { id: "h3", path: "M 140 270 V 180 H 320 V 220 H 190", color: "#00B4D8" },
        { id: "h4", path: "M 480 110 H 550", color: "#FB5607" },
        { id: "h5", path: "M 360 210 V 140 H 590", color: "#00B4D8" },
        { id: "h6", path: "M 530 160 H 600 V 220", color: "#06D6A0" },
        { id: "h7", path: "M 460 250 V 160 H 570 V 210 H 470", color: "#06D6A0" },
        { id: "h8", path: "M 160 290 H 240 V 320 H 170", color: "#FB5607" },
        { id: "h9", path: "M 270 290 H 570", color: "#FF006E" },
        { id: "h10", path: "M 150 360 H 620 V 330 H 480", color: "#00B4D8" },
        { id: "h11", path: "M 180 395 H 580", color: "#FFBE0B" },
        { id: "h12", path: "M 140 455 H 630 V 425 H 220", color: "#06D6A0" },
        { id: "h13", path: "M 480 485 H 580", color: "#FFBE0B" },
        { id: "h14", path: "M 120 515 V 200 H 330 V 270 H 420", color: "#00B4D8" },
        { id: "h15", path: "M 150 545 H 410 V 575 H 350", color: "#FFBE0B" },
        { id: "h16", path: "M 210 600 V 550 H 300 V 620 H 370", color: "#06D6A0" },
        { id: "h17", path: "M 230 630 V 570 H 260 V 620", color: "#FF006E" },
        { id: "h18", path: "M 400 650 V 580 H 470", color: "#FB5607" },
        { id: "h19", path: "M 440 660 V 560 H 470 V 630 H 500", color: "#8338EC" },
        { id: "h20", path: "M 520 630 V 580 H 550", color: "#FFBE0B" },
        { id: "h21", path: "M 410 690 H 370 V 640 H 440 V 670", color: "#FF006E" }
      ]
    },
    5: {
      id: 5,
      name: "Level 5 - Snake Labyrinth",
      board: { width: 520, height: 600 },
      paths: [
        { id: "u_cyan",         path: "M 120 90 V 140 H 80 V 70", color: "#00B4D8" },
        { id: "yellow_left_v",  path: "M 80 540 V 180 H 120 V 210", color: "#FFBE0B" },
        { id: "pink_left_u",    path: "M 160 470 V 240 H 120 V 470", color: "#FF006E" },
        { id: "orange_top_s",   path: "M 220 170 V 110 H 300 V 75 H 155 V 190 H 190 V 235", color: "#FB5607" },
        { id: "pink_center_h",  path: "M 340 135 H 260 V 260 H 225 V 220", color: "#FF006E" },
        { id: "purple_top_box", path: "M 340 105 H 380 V 135 H 300 V 265 H 410 V 75 H 325", color: "#8338EC" },
        { id: "green_inner_c",  path: "M 370 200 H 330 V 230 H 360", color: "#06D6A0" },
        { id: "yellow_mid_bar", path: "M 190 330 V 285 H 430", color: "#FFBE0B" },
        { id: "yellow_hook",    path: "M 190 390 V 345 H 255", color: "#FFBE0B" },
        { id: "cyan_corner",    path: "M 255 385 V 425 H 180", color: "#00B4D8" },
        { id: "orange_mid_s",   path: "M 400 425 H 295 V 365 H 380", color: "#FB5607" },
        { id: "purple_bot_u",   path: "M 400 475 H 295 V 435 H 345", color: "#8338EC" },
        { id: "green_bot_u",    path: "M 410 525 H 120 V 475 H 265", color: "#06D6A0" }
      ]
    },
    6: {
      id: 6,
      name: "Level 6 - Box & Serpents",
      board: { width: 500, height: 640 },
      paths: [
        { id: "green_frame", path: "M 420 220 V 90 H 100 V 320 H 380 V 350 H 300", color: "#06D6A0" },
        { id: "pink_snake",  path: "M 170 140 H 240 V 170 H 140 V 140 H 250 V 170 H 290 V 140 H 370 V 200 H 170", color: "#FF006E" },
        { id: "yellow_top",  path: "M 380 110 H 330", color: "#FFBE0B" },
        { id: "yellow_hook", path: "M 200 230 H 160 V 270 H 140", color: "#FFBE0B" },
        { id: "pink_u",      path: "M 310 270 V 220 H 260 V 270", color: "#FF006E" },
        { id: "purp_wave1",  path: "M 270 350 H 210 V 380 H 170 V 350 H 70", color: "#8338EC" },
        { id: "cyan_wave1",  path: "M 210 440 H 100 V 370", color: "#00B4D8" },
        { id: "orange_hook", path: "M 310 380 H 260 V 410 H 230", color: "#FB5607" },
        { id: "purp_wave2",  path: "M 420 340 V 380 H 370 V 420 H 330", color: "#8338EC" },
        { id: "green_arrow", path: "M 420 440 V 390", color: "#06D6A0" },
        { id: "orange_wave", path: "M 240 430 V 490 H 200 V 530", color: "#FB5607" },
        { id: "purp_s",      path: "M 160 490 H 100 V 520 H 70", color: "#8338EC" },
        { id: "orange_c",    path: "M 80 540 V 570 H 140", color: "#FB5607" },
        { id: "yellow_d",    path: "M 240 540 V 580", color: "#FFBE0B" },
        { id: "cyan_wave2",  path: "M 410 510 H 350 V 570 H 300 V 540", color: "#00B4D8" },
        { id: "cyan_r",      path: "M 380 570 H 440", color: "#00B4D8" }
      ]
    }
  };

  // ------------------------------------------
  // 2. GEOMETRY & TRAJECTORY UTILITIES
  // ------------------------------------------
  function dist(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  function getPointAtDistance(polyline, d) {
    if (d <= 0) return { point: { ...polyline[0] }, segIndex: 0 };
    let current = 0;
    for (let i = 0; i < polyline.length - 1; i++) {
      const p1 = polyline[i];
      const p2 = polyline[i + 1];
      const segLen = dist(p1, p2);
      if (current + segLen >= d || i === polyline.length - 2) {
        const remain = Math.max(0, d - current);
        const ratio = segLen === 0 ? 0 : Math.min(1, remain / segLen);
        return {
          point: {
            x: p1.x + (p2.x - p1.x) * ratio,
            y: p1.y + (p2.y - p1.y) * ratio
          },
          segIndex: i
        };
      }
      current += segLen;
    }
    return { point: { ...polyline[polyline.length - 1] }, segIndex: polyline.length - 2 };
  }

  function slicePolyline(polyline, uStart, uEnd) {
    if (uStart >= uEnd) return [];
    const startInfo = getPointAtDistance(polyline, uStart);
    const endInfo = getPointAtDistance(polyline, uEnd);

    const pts = [startInfo.point];
    for (let i = startInfo.segIndex + 1; i <= endInfo.segIndex; i++) {
      const v = polyline[i];
      if (dist(pts[pts.length - 1], v) > 0.5) {
        pts.push({ ...v });
      }
    }
    if (dist(pts[pts.length - 1], endInfo.point) > 0.5) {
      pts.push(endInfo.point);
    }
    return pts;
  }

  function polylineToPathD(pts) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
    }
    return d;
  }

  function pointToSegmentDist(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = x1 + t * dx;
    const projY = y1 + t * dy;
    return Math.hypot(px - projX, py - projY);
  }

  function distanceToArrow(px, py, arrow) {
    let minDist = Infinity;
    for (const seg of arrow.getSegments()) {
      const d = pointToSegmentDist(px, py, seg.p1.x, seg.p1.y, seg.p2.x, seg.p2.y);
      if (d < minDist) minDist = d;
    }
    const headD = Math.hypot(px - arrow.headPoint.x, py - arrow.headPoint.y);
    if (headD < minDist) minDist = headD;
    return minDist;
  }

  function getArrowheadData(head, direction) {
    const hx = head.x;
    const hy = head.y;
    const L = 15; // Base length back from head
    const W = 10; // Wing half-width (20px total, vs 10px stem)
    const E = 4;  // Forward tip extension

    let tip, wing1, wing2, stemEnd;

    if (direction === "RIGHT") {
      tip = { x: hx + E, y: hy };
      wing1 = { x: hx - L, y: hy - W };
      wing2 = { x: hx - L, y: hy + W };
      stemEnd = { x: hx - 8, y: hy };
    } else if (direction === "LEFT") {
      tip = { x: hx - E, y: hy };
      wing1 = { x: hx + L, y: hy - W };
      wing2 = { x: hx + L, y: hy + W };
      stemEnd = { x: hx + 8, y: hy };
    } else if (direction === "DOWN") {
      tip = { x: hx, y: hy + E };
      wing1 = { x: hx - W, y: hy - L };
      wing2 = { x: hx + W, y: hy - L };
      stemEnd = { x: hx, y: hy - 8 };
    } else if (direction === "UP") {
      tip = { x: hx, y: hy - E };
      wing1 = { x: hx - W, y: hy + L };
      wing2 = { x: hx + W, y: hy + L };
      stemEnd = { x: hx, y: hy + 8 };
    } else {
      tip = { x: hx + E, y: hy };
      wing1 = { x: hx - L, y: hy - W };
      wing2 = { x: hx - L, y: hy + W };
      stemEnd = { x: hx - 8, y: hy };
    }

    return {
      points: `${wing1.x.toFixed(1)},${wing1.y.toFixed(1)} ${tip.x.toFixed(1)},${tip.y.toFixed(1)} ${wing2.x.toFixed(1)},${wing2.y.toFixed(1)}`,
      stemEnd
    };
  }

  // ------------------------------------------
  // 3. ARROW CLASS
  // ------------------------------------------
  class Arrow {
    constructor({ id, path = "", color = null }) {
      this.id = String(id);
      this.path = String(path || "").trim();
      this.color = color;
      this.isActive = true;
      this.isRemoved = false;
      this.points = this.parsePoints();
      this.headPoint = this.points[this.points.length - 1] || { x: 0, y: 0 };
      this.direction = this.determineDirection();
      this.length = this.calculateLength();
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

    calculateLength() {
      let total = 0;
      for (let i = 0; i < this.points.length - 1; i++) {
        total += dist(this.points[i], this.points[i + 1]);
      }
      return total;
    }

    parsePoints() {
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
      return pts;
    }

    getSegments() {
      if (this._segments) return this._segments;
      const segs = [];
      for (let i = 0; i < this.points.length - 1; i++) {
        const p1 = this.points[i], p2 = this.points[i + 1];
        segs.push({
          p1, p2,
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
  // 4. MOVEMENT ENGINE (Precise 2D Ray Collision)
  // ------------------------------------------
  class MovementEngine {
    constructor(board, arrows = []) {
      this.board = board;
      this.arrows = arrows;
      this.tolerance = 10;
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
        if (seg.isVertical && seg.p1.x > head.x + 2 && head.y >= minY - tol && head.y <= maxY + tol) {
          return { distance: seg.p1.x - head.x };
        }
        if (seg.isHorizontal && Math.abs(seg.p1.y - head.y) <= tol && maxX > head.x + 2) {
          return { distance: Math.max(0, minX - head.x) };
        }
      } else if (dir === "LEFT") {
        if (seg.isVertical && seg.p1.x < head.x - 2 && head.y >= minY - tol && head.y <= maxY + tol) {
          return { distance: head.x - seg.p1.x };
        }
        if (seg.isHorizontal && Math.abs(seg.p1.y - head.y) <= tol && minX < head.x - 2) {
          return { distance: Math.max(0, head.x - maxX) };
        }
      } else if (dir === "DOWN") {
        if (seg.isHorizontal && seg.p1.y > head.y + 2 && head.x >= minX - tol && head.x <= maxX + tol) {
          return { distance: seg.p1.y - head.y };
        }
        if (seg.isVertical && Math.abs(seg.p1.x - head.x) <= tol && maxY > head.y + 2) {
          return { distance: Math.max(0, minY - head.y) };
        }
      } else if (dir === "UP") {
        if (seg.isHorizontal && seg.p1.y < head.y - 2 && head.x >= minX - tol && head.x <= maxX + tol) {
          return { distance: head.y - seg.p1.y };
        }
        if (seg.isVertical && Math.abs(seg.p1.x - head.x) <= tol && minY < head.y - 2) {
          return { distance: Math.max(0, head.y - maxY) };
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
  // 5. AUDIO SYNTHESIZER
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
      osc.frequency.setValueAtTime(340, t);
      osc.frequency.exponentialRampToValueAtTime(780, t + 0.18);
      osc.frequency.exponentialRampToValueAtTime(1020, t + 0.32);
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.36);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.36);
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
      gain.gain.setValueAtTime(0.24, t);
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
  // 6. SVG BOARD RENDERER
  // ------------------------------------------
  class SVGRenderer {
    constructor(container) {
      this.container = container;
      this.ns = "http://www.w3.org/2000/svg";
      this.palette = [
        "#3A86FF", // Blue
        "#06D6A0", // Mint
        "#FF006E", // Magenta
        "#8338EC", // Purple
        "#FB5607", // Orange
        "#FFBE0B", // Gold
        "#00B4D8", // Cyan
        "#7209B7"  // Violet
      ];
      this.arrowColors = new Map();
    }

    getArrowColor(arrow, idx = 0) {
      if (arrow && arrow.color) return arrow.color;
      const arrowId = arrow ? arrow.id : idx;
      if (this.arrowColors.has(String(arrowId))) {
        return this.arrowColors.get(String(arrowId));
      }
      const c = this.palette[idx % this.palette.length];
      this.arrowColors.set(String(arrowId), c);
      return c;
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

      // Background dot matrix
      contentGroup.appendChild(this.createGridBackground(w, h));

      const active = arrows.filter((a) => a.isActive && !a.isRemoved);
      active.forEach((arrow, idx) => {
        const color = this.getArrowColor(arrow, idx);

        const group = document.createElementNS(this.ns, "g");
        group.setAttribute("id", `arrow-group-${arrow.id}`);
        group.classList.add("arrow-item");
        group.dataset.arrowId = arrow.id;

        // Arrowhead data with flaring wings and trimmed stem end
        const headData = getArrowheadData(arrow.headPoint, arrow.direction);
        const stemPts = [...arrow.points.slice(0, -1), headData.stemEnd];
        const stemPathD = polylineToPathD(stemPts);

        // Path body (sleek rounded snake, 10px stroke)
        const pathEl = document.createElementNS(this.ns, "path");
        pathEl.setAttribute("d", stemPathD);
        pathEl.setAttribute("fill", "none");
        pathEl.setAttribute("stroke", color);
        pathEl.setAttribute("stroke-width", "10");
        pathEl.setAttribute("stroke-linecap", "round");
        pathEl.setAttribute("stroke-linejoin", "round");
        pathEl.setAttribute("id", `arrow-path-${arrow.id}`);
        pathEl.classList.add("board-path");
        pathEl.dataset.arrowId = arrow.id;

        // Integrated triangular head (crisp, proportional wings)
        const headEl = document.createElementNS(this.ns, "polygon");
        headEl.setAttribute("points", headData.points);
        headEl.setAttribute("fill", color);
        headEl.setAttribute("stroke", color);
        headEl.setAttribute("stroke-width", "1.5");
        headEl.setAttribute("stroke-linejoin", "round");
        headEl.setAttribute("id", `arrow-head-${arrow.id}`);
        headEl.classList.add("board-head");
        headEl.dataset.arrowId = arrow.id;

        // Touch hit area (tightened to 18px to prevent overlapping adjacent paths)
        const hitEl = document.createElementNS(this.ns, "path");
        hitEl.setAttribute("d", arrow.path);
        hitEl.setAttribute("fill", "none");
        hitEl.setAttribute("stroke", "transparent");
        hitEl.setAttribute("stroke-width", "18");
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
        const arrow = (activeArrows || []).find((a) => String(a.id) === String(arrowId));
        const orig = (arrow && arrow.color) || this.arrowColors.get(String(arrowId)) || "#3A86FF";
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
  // 7. SLITHERING ANIMATION CONTROLLER
  // ------------------------------------------
  class SlitherAnimator {
    constructor() {
      this.isAnimating = false;
    }

    // Slithers arrow along its path and unbends straight out along heading
    animateEscape(groupEl, pathEl, headEl, arrow, exitDistance, duration = 380) {
      this.isAnimating = true;
      const head = arrow.headPoint;
      const dir = arrow.direction;
      const len = arrow.length;

      // Unit vector for exit ray
      let dx = 0, dy = 0;
      if (dir === "RIGHT") dx = 1;
      else if (dir === "LEFT") dx = -1;
      else if (dir === "DOWN") dy = 1;
      else if (dir === "UP") dy = -1;

      // Trajectory: original vertices + far off-screen exit point
      const totalExtension = exitDistance + len + 400;
      const exitPoint = {
        x: head.x + dx * totalExtension,
        y: head.y + dy * totalExtension
      };
      const trajectory = [...arrow.points, exitPoint];

      const totalTravel = exitDistance + len + 80;
      const start = performance.now();

      return new Promise((resolve) => {
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          // Ease-in acceleration: starts smooth, speeds up as it straightens out
          const eased = Math.pow(p, 1.5);
          const s = totalTravel * eased;

          const uTail = s;
          const uHead = len + s;

          const uStemEnd = Math.max(uTail + 1, uHead - 8);
          const slicedStem = slicePolyline(trajectory, uTail, uStemEnd);
          if (slicedStem.length >= 2) {
            pathEl.setAttribute("d", polylineToPathD(slicedStem));
          }
          const currentHead = getPointAtDistance(trajectory, uHead).point;
          headEl.setAttribute("points", getArrowheadData(currentHead, dir).points);

          // Fade out near very end
          if (p > 0.8) {
            groupEl.style.opacity = String(Math.max(0, 1 - (p - 0.8) * 5));
          }

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

    // Elastic nudge and spring back when blocked
    animateBlocked(pathEl, headEl, arrow, duration = 180) {
      this.isAnimating = true;
      const head = arrow.headPoint;
      const dir = arrow.direction;
      const len = arrow.length;

      let dx = 0, dy = 0;
      if (dir === "RIGHT") dx = 1;
      else if (dir === "LEFT") dx = -1;
      else if (dir === "DOWN") dy = 1;
      else if (dir === "UP") dy = -1;

      const trajectory = [
        ...arrow.points,
        { x: head.x + dx * 50, y: head.y + dy * 50 }
      ];

      const start = performance.now();
      const initialHeadData = getArrowheadData(head, dir);
      const initialStemPts = [...arrow.points.slice(0, -1), initialHeadData.stemEnd];
      const initialD = polylineToPathD(initialStemPts);

      return new Promise((resolve) => {
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          // Spring factor
          const factor = Math.sin(p * Math.PI * 1.5) * Math.exp(-p * 2.5);
          const s = Math.max(0, 14 * factor);

          const uStemEnd = Math.max(s + 1, len + s - 8);
          const slicedStem = slicePolyline(trajectory, s, uStemEnd);
          if (slicedStem.length >= 2) {
            pathEl.setAttribute("d", polylineToPathD(slicedStem));
          }
          const currentHead = getPointAtDistance(trajectory, len + s).point;
          headEl.setAttribute("points", getArrowheadData(currentHead, dir).points);

          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            pathEl.setAttribute("d", initialD);
            headEl.setAttribute("points", initialHeadData.points);
            this.isAnimating = false;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    }
  }

  // ------------------------------------------
  // 8. GAME CONTROLLER
  // ------------------------------------------
  let currentLevelNum = 1;
  let currentLevelData = null;
  let activeArrows = [];
  let lives = 3;
  let remainingHints = 3;

  const audio = new AudioManager();
  const animator = new SlitherAnimator();
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
    const badge = document.getElementById("levelBadge");
    if (badge && currentLevelData) {
      badge.textContent = currentLevelData.name || `Level ${currentLevelNum}`;
    }

    const hearts = document.querySelectorAll(".heart");
    hearts.forEach((h, idx) => {
      if (idx < lives) {
        h.classList.remove("lost");
      } else {
        h.classList.add("lost");
      }
    });

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
    const pathEl = document.getElementById(`arrow-path-${arrow.id}`);
    const headEl = document.getElementById(`arrow-head-${arrow.id}`);
    if (!groupEl || !pathEl || !headEl) return;

    isLocked = true;

    if (analysis.canMove) {
      audio.playEscape();
      renderer.setArrowState(arrow.id, "selected");

      // Animate slithering along path out to edge!
      animator.animateEscape(groupEl, pathEl, headEl, arrow, analysis.travelDistance).then(() => {
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

      // Animate elastic nudge and rebound
      animator.animateBlocked(pathEl, headEl, arrow).then(() => {
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

    // Pointer event delegation with nearest-arrow geometric resolution
    container.addEventListener("pointerdown", (e) => {
      // 1. Direct hit on visible path or arrow head
      if (e.target.classList.contains("board-path") || e.target.classList.contains("board-head")) {
        const id = e.target.dataset.arrowId;
        if (id) {
          handleArrowClick(id);
          return;
        }
      }

      // 2. High-precision coordinate-based nearest-arrow targeting
      const svg = container.querySelector("svg");
      if (svg && activeArrows.length > 0) {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

        let closestArrow = null;
        let closestDist = Infinity;
        for (const arrow of activeArrows) {
          if (!arrow.isActive || arrow.isRemoved) continue;
          const d = distanceToArrow(svgP.x, svgP.y, arrow);
          if (d < closestDist) {
            closestDist = d;
            closestArrow = arrow;
          }
        }
        if (closestArrow && closestDist <= 22) {
          handleArrowClick(closestArrow.id);
          return;
        }
      }

      // 3. Fallback to closest element with data-arrow-id
      const target = e.target.closest("[data-arrow-id]");
      if (target && target.dataset.arrowId) {
        handleArrowClick(target.dataset.arrowId);
      }
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

    // Level Badge click to jump levels
    const levelBadgeEl = document.getElementById("levelBadge");
    if (levelBadgeEl) {
      levelBadgeEl.style.cursor = "pointer";
      levelBadgeEl.title = "Click to jump to next level (or press 1-6)";
      levelBadgeEl.addEventListener("click", () => {
        audio.playClick();
        loadLevel(currentLevelNum >= 6 ? 1 : currentLevelNum + 1);
      });
    }

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.key === "r" || e.key === "R") loadLevel(currentLevelNum);
      if (e.key === "h" || e.key === "H") provideHint();
      if (e.key === "m" || e.key === "M") soundButton.click();
      if (e.key >= "1" && e.key <= "6") {
        audio.playClick();
        loadLevel(parseInt(e.key, 10));
      }
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
