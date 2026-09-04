export class LevelManager {
  constructor(basePath = "levels") {
    this.basePath = basePath;
    this.cache = new Map();
    this.currentLevelNumber = 1;
    this.currentLevel = null;
    this.maxLevel = 6;
  }

  getEmbeddedLevels() {
    return {
      1: {
        id: 1,
        name: "Level 1 - First Steps",
        board: { width: 600, height: 600 },
        paths: [
          { id: "a1", path: "M 150 150 H 300 V 220 H 480", direction: "RIGHT" },
          { id: "a2", path: "M 300 300 V 420 H 480", direction: "RIGHT" },
          { id: "a3", path: "M 150 420 H 220 V 300", direction: "UP" }
        ]
      },
      2: {
        id: 2,
        name: "Level 2 - Clear the Path",
        board: { width: 700, height: 700 },
        paths: [
          { id: "b1", path: "M 180 180 H 300 V 450", direction: "DOWN" },
          { id: "b2", path: "M 520 320 H 380", direction: "LEFT" },
          { id: "b3", path: "M 520 180 V 260 H 380", direction: "LEFT" },
          { id: "b4", path: "M 180 480 H 320 V 580", direction: "DOWN" }
        ]
      },
      3: {
        id: 3,
        name: "Level 3 - Corner Escape",
        board: { width: 800, height: 800 },
        paths: [
          { id: "c1", path: "M 200 160 H 350 V 240 H 650", direction: "RIGHT" },
          { id: "c2", path: "M 400 120 V 200 H 280", direction: "LEFT" },
          { id: "c3", path: "M 200 320 V 440 H 340", direction: "RIGHT" },
          { id: "c4", path: "M 500 280 V 480", direction: "DOWN" },
          { id: "c5", path: "M 650 380 H 450", direction: "LEFT" },
          { id: "c6", path: "M 240 540 H 440 V 660", direction: "DOWN" },
          { id: "c7", path: "M 560 540 V 640 H 700", direction: "RIGHT" },
          { id: "c8", path: "M 350 720 H 150", direction: "LEFT" }
        ]
      },
      4: {
        id: 4,
        name: "Level 4 - The Maze",
        board: { width: 1000, height: 1200 },
        paths: [
          { id: "d1", path: "M80 100 H260 V220 H360", direction: "RIGHT" },
          { id: "d2", path: "M420 80 V220 H520", direction: "RIGHT" },
          { id: "d3", path: "M600 120 H760 V220 H840", direction: "RIGHT" },
          { id: "d4", path: "M900 100 V220 H960", direction: "RIGHT" },
          { id: "d5", path: "M120 300 H260 V400", direction: "DOWN" },
          { id: "d6", path: "M420 260 V400 H520", direction: "RIGHT" },
          { id: "d7", path: "M620 300 H760 V400 H820", direction: "RIGHT" },
          { id: "d8", path: "M880 260 V400 H940", direction: "RIGHT" },
          { id: "d9", path: "M80 500 H260 V600 H340", direction: "RIGHT" },
          { id: "d10", path: "M420 440 V600 H520", direction: "RIGHT" },
          { id: "d11", path: "M620 520 H760 V600", direction: "DOWN" },
          { id: "d12", path: "M880 500 V620 H940", direction: "RIGHT" },
          { id: "d13", path: "M120 700 H300 V800", direction: "DOWN" },
          { id: "d14", path: "M420 660 V800 H520", direction: "RIGHT" },
          { id: "d15", path: "M620 720 H760 V800 H820", direction: "RIGHT" },
          { id: "d16", path: "M900 700 V820 H960", direction: "RIGHT" },
          { id: "d17", path: "M80 900 H260 V1000", direction: "DOWN" },
          { id: "d18", path: "M420 860 V1000 H520", direction: "RIGHT" },
          { id: "d19", path: "M620 900 H760 V1000 H840", direction: "RIGHT" },
          { id: "d20", path: "M880 860 V1000 H940", direction: "RIGHT" }
        ]
      },
      5: {
        id: 5,
        name: "Level 5 - Labyrinth",
        board: { width: 1000, height: 1300 },
        paths: [
          { id: "e1", path: "M80 100 H260 V220 H360", direction: "RIGHT" },
          { id: "e2", path: "M420 80 V220 H520", direction: "RIGHT" },
          { id: "e3", path: "M600 120 H760 V240", direction: "DOWN" },
          { id: "e4", path: "M880 100 V220 H960", direction: "RIGHT" },
          { id: "e5", path: "M120 300 H260 V420", direction: "DOWN" },
          { id: "e6", path: "M420 280 V400 H520", direction: "RIGHT" },
          { id: "e7", path: "M620 320 H760 V420 H840", direction: "RIGHT" },
          { id: "e8", path: "M920 300 V420 H980", direction: "RIGHT" },
          { id: "e9", path: "M80 520 H260 V640 H360", direction: "RIGHT" },
          { id: "e10", path: "M420 500 V640 H520", direction: "RIGHT" },
          { id: "e11", path: "M620 540 H760 V660", direction: "DOWN" },
          { id: "e12", path: "M880 520 V660 H960", direction: "RIGHT" },
          { id: "e13", path: "M120 720 H300 V840", direction: "DOWN" },
          { id: "e14", path: "M440 720 V840 H540", direction: "RIGHT" },
          { id: "e15", path: "M640 740 H800 V860", direction: "DOWN" },
          { id: "e16", path: "M900 740 V860 H980", direction: "RIGHT" },
          { id: "e17", path: "M80 940 H260 V1060", direction: "DOWN" },
          { id: "e18", path: "M420 920 V1060 H520", direction: "RIGHT" },
          { id: "e19", path: "M620 940 H760 V1060 H840", direction: "RIGHT" },
          { id: "e20", path: "M880 940 V1080 H960", direction: "RIGHT" },
          { id: "e21", path: "M160 1160 H320", direction: "RIGHT" },
          { id: "e22", path: "M520 1120 V1240", direction: "DOWN" }
        ]
      },
      6: {
        id: 6,
        name: "Level 6 - Master Challenge",
        board: { width: 1100, height: 1400 },
        paths: [
          { id: "f1", path: "M100 100 H280 V240 H380", direction: "RIGHT" },
          { id: "f2", path: "M440 100 V240 H540", direction: "RIGHT" },
          { id: "f3", path: "M640 120 H800 V240 H900", direction: "RIGHT" },
          { id: "f4", path: "M980 120 V260 H1060", direction: "RIGHT" },
          { id: "f5", path: "M140 320 H280 V440", direction: "DOWN" },
          { id: "f6", path: "M440 300 V440 H540", direction: "RIGHT" },
          { id: "f7", path: "M660 340 H800 V440 H880", direction: "RIGHT" },
          { id: "f8", path: "M980 320 V460 H1060", direction: "RIGHT" },
          { id: "f9", path: "M100 540 H280 V660 H380", direction: "RIGHT" },
          { id: "f10", path: "M440 520 V660 H540", direction: "RIGHT" },
          { id: "f11", path: "M660 560 H820 V680", direction: "DOWN" },
          { id: "f12", path: "M980 540 V680 H1060", direction: "RIGHT" },
          { id: "f13", path: "M140 760 H300 V880", direction: "DOWN" },
          { id: "f14", path: "M460 760 V880 H560", direction: "RIGHT" },
          { id: "f15", path: "M680 760 H840 V880 H920", direction: "RIGHT" },
          { id: "f16", path: "M1000 760 V900 H1080", direction: "RIGHT" },
          { id: "f17", path: "M100 980 H280 V1100", direction: "DOWN" },
          { id: "f18", path: "M440 960 V1100 H540", direction: "RIGHT" },
          { id: "f19", path: "M680 980 H820 V1100 H920", direction: "RIGHT" },
          { id: "f20", path: "M1000 980 V1120 H1080", direction: "RIGHT" },
          { id: "f21", path: "M160 1200 H340", direction: "RIGHT" },
          { id: "f22", path: "M560 1200 V1300 H620", direction: "RIGHT" },
          { id: "f23", path: "M760 1220 H940", direction: "RIGHT" },
          { id: "f24", path: "M1040 1180 V1320", direction: "DOWN" }
        ]
      }
    };
  }

  async load(levelNumber = 1) {
    const parsed = Number(levelNumber);
    if (!Number.isInteger(parsed) || parsed < 1) {
      throw new Error("LevelManager.load requires a positive integer level number.");
    }

    if (this.cache.has(parsed)) {
      this.currentLevelNumber = parsed;
      this.currentLevel = this.cache.get(parsed);
      return this.currentLevel;
    }

    let data = null;

    try {
      const response = await fetch(`${this.basePath}/level${parsed}.json`);
      if (response.ok) {
        data = await response.json();
      }
    } catch (e) {
      // Fetch failed (e.g. file:// protocol or offline)
    }

    if (!data) {
      const embedded = this.getEmbeddedLevels();
      if (embedded[parsed]) {
        data = embedded[parsed];
      }
    }

    if (!data) {
      throw new Error(`Failed to load level ${parsed}.json`);
    }

    const level = this.validate(data);
    this.cache.set(parsed, level);
    this.currentLevelNumber = parsed;
    this.currentLevel = level;
    return level;
  }

  next() {
    return this.load(this.currentLevelNumber + 1);
  }

  previous() {
    return this.load(Math.max(1, this.currentLevelNumber - 1));
  }

  restart() {
    if (this.currentLevelNumber == null) {
      throw new Error("No level loaded to restart.");
    }

    return this.load(this.currentLevelNumber);
  }

  getCurrent() {
    return this.currentLevel;
  }

  validate(levelData) {
    if (!levelData || typeof levelData !== "object") {
      throw new Error("Level validation failed: invalid data");
    }

    return {
      id: Number(levelData.id),
      name: String(levelData.name || `Level ${levelData.id}`),
      board: {
        width: Number(levelData.board.width),
        height: Number(levelData.board.height)
      },
      paths: (levelData.paths || []).map((p) => ({
        id: String(p.id),
        path: String(p.path),
        direction: typeof p.direction === "string" ? p.direction.toUpperCase() : "RIGHT",
        metadata: p.metadata || null
      }))
    };
  }
}
