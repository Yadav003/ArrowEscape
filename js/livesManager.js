export class LivesManager extends EventTarget {
  constructor(initialLives = 3) {
    super();
    this.initialLives = Number(initialLives) || 3;
    this.lives = this.initialLives;
  }

  reset(initialLives = 3) {
    this.initialLives = Number(initialLives) || 3;
    this.lives = this.initialLives;
    this.dispatchEvent(
      new CustomEvent("LivesChanged", {
        detail: { lives: this.lives },
      })
    );
    return this;
  }

  loseLife() {
    if (this.isGameOver()) {
      return this;
    }

    this.lives = Math.max(0, this.lives - 1);
    this.dispatchEvent(
      new CustomEvent("LifeLost", {
        detail: { lives: this.lives },
      })
    );
    this.dispatchEvent(
      new CustomEvent("LivesChanged", {
        detail: { lives: this.lives },
      })
    );

    if (this.isGameOver()) {
      this.dispatchEvent(
        new CustomEvent("GameOver", {
          detail: { lives: this.lives },
        })
      );
    }

    return this;
  }

  getLives() {
    return this.lives;
  }

  isGameOver() {
    return this.lives <= 0;
  }
}
