export class LevelManager {
  constructor(basePath = "levels") {
    this.basePath = basePath;
    this.cache = new Map();
    this.currentLevelNumber = 1;
    this.currentLevel = null;
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

    const response = await fetch(`${this.basePath}/level${parsed}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load level ${parsed}.json`);
    }

    const data = await response.json();
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
    const requiredLevelFields = ["id", "name", "board", "paths"];
    requiredLevelFields.forEach((field) => {
      if (!(field in levelData)) {
        throw new Error(`Level validation failed: missing ${field}`);
      }
    });

    if (!Number.isInteger(levelData.id) || levelData.id < 1) {
      throw new Error("Level validation failed: invalid id");
    }

    if (typeof levelData.name !== "string" || levelData.name.trim() === "") {
      throw new Error("Level validation failed: invalid name");
    }

    if (typeof levelData.board !== "object" || levelData.board == null) {
      throw new Error("Level validation failed: missing board object");
    }

    if (!Number.isInteger(levelData.board.width) || levelData.board.width <= 0) {
      throw new Error("Level validation failed: invalid board width");
    }

    if (!Number.isInteger(levelData.board.height) || levelData.board.height <= 0) {
      throw new Error("Level validation failed: invalid board height");
    }

    if (!Array.isArray(levelData.paths)) {
      throw new Error("Level validation failed: paths must be an array");
    }

    levelData.paths.forEach((path, index) => {
      const requiredPathFields = ["id", "path", "direction"];
      requiredPathFields.forEach((field) => {
        if (!(field in path)) {
          throw new Error(`Level validation failed: path at index ${index} is missing ${field}`);
        }
      });

      if (typeof path.id !== "string" && typeof path.id !== "number") {
        throw new Error(`Level validation failed: path id at index ${index} must be string or number`);
      }

      if (typeof path.path !== "string" || path.path.trim() === "") {
        throw new Error(`Level validation failed: invalid path data at index ${index}`);
      }

      if (typeof path.direction !== "string" || path.direction.trim() === "") {
        throw new Error(`Level validation failed: invalid direction at index ${index}`);
      }
    });

    return {
      ...levelData,
      board: {
        width: levelData.board.width,
        height: levelData.board.height
      },
      paths: levelData.paths.map((path) => ({
        id: String(path.id),
        path: path.path,
        direction: path.direction.toUpperCase(),
        metadata: path.metadata || null
      }))
    };
  }
}
