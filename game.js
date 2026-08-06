import { LevelManager } from "./js/levelManager.js";
import { Board } from "./js/board.js";
import { LivesManager } from "./js/livesManager.js";

const levelManager = new LevelManager("levels");

const livesManager = new LivesManager(3);

document.addEventListener("DOMContentLoaded", async () => {
  const svgContainer = document.getElementById("svgContainer");
  const board = new Board(svgContainer, {
    minScale: 0.35,
    maxScale: 1.05,
    fillRatio: 0.88,
    livesManager,
  });

  svgContainer.addEventListener("ArrowSelected", (event) => {
    const { arrow, analysis } = event.detail;
    console.log(`Arrow #${arrow.id}`);
    console.log(`Direction: ${arrow.direction}`);
    console.log(`Can Move: ${analysis.canMove}`);
    console.log(`Blocked By: ${analysis.blockingArrowId ? `Arrow #${analysis.blockingArrowId}` : "None"}`);
    console.log(`Distance: ${analysis.travelDistance}`);
    console.log(`Exit Position: x=${analysis.exitPoint.x}, y=${analysis.exitPoint.y}`);
  });

  svgContainer.addEventListener("AnimationStarted", (event) => {
    const { arrow, duration } = event.detail;
    console.log("Animation Started");
    console.log(`Arrow #${arrow.id}`);
    console.log(`Duration: ${duration}ms`);
  });

  svgContainer.addEventListener("AnimationCompleted", (event) => {
    const { arrow } = event.detail;
    console.log("Animation Finished");
    console.log(`Arrow #${arrow.id}`);
  });

  svgContainer.addEventListener("AnimationCancelled", (event) => {
    const { arrow } = event.detail;
    console.log("Animation Cancelled");
    console.log(`Arrow #${arrow.id}`);
  });

  svgContainer.addEventListener("ArrowDeselected", (event) => {
    const { arrow } = event.detail;
    console.log(`ArrowDeselected -> id=${arrow.id}, direction=${arrow.direction}`);
  });

  svgContainer.addEventListener("BoardUpdated", (event) => {
    const { activeArrows, removedArrows, movableArrows, blockedArrows, levelCompleted } = event.detail;
    console.log(`Remaining: ${activeArrows.length}`);
    console.log(`Removed: ${removedArrows.length}`);
    console.log(`Movable: ${movableArrows.length}`);
    console.log(`Blocked: ${blockedArrows.length}`);
    console.log(`Level Complete: ${levelCompleted}`);
  });

svgContainer.addEventListener("LifeLost", () => {
    updateHeartsUI(livesManager.getLives());
    showGameMessage("Arrow collision! -1 ❤", false);
  });

  svgContainer.addEventListener("LivesChanged", () => {
    updateHeartsUI(livesManager.getLives());
  });

svgContainer.addEventListener("GameOver", () => {
    showGameOverOverlay();
  });

  svgContainer.addEventListener("LevelCompleted", () => {
    showLevelCompleteOverlay(levelManager.getCurrent());
  });

  updateHeartsUI(livesManager.getLives());

const renderLevel = async (levelNumber) => {
    try {
      await levelManager.load(levelNumber);
      board.render(levelManager.getCurrent());
      updateLevelBadge(levelManager.getCurrent());
    } catch (error) {
      console.error(error);
    }
  };

  await renderLevel(1);

  window.addEventListener("resize", () => {
    board.resize();
  });

document.getElementById("backButton").addEventListener("click", async () => {
    try {
      await levelManager.previous();
      livesManager.reset(3);
      hideGameOverOverlay();
      hideLevelCompleteOverlay();
      board.render(levelManager.getCurrent());
      updateLevelBadge(levelManager.getCurrent());
    } catch (error) {
      console.error(error);
    }
  });

  document.getElementById("restartButton").addEventListener("click", async () => {
    await restartLevel();
  });

  document.getElementById("retryOverlayButton").addEventListener("click", async () => {
    await restartLevel();
  });

document.getElementById("exitOverlayButton").addEventListener("click", () => {
    hideGameOverOverlay();
    window.location.href = "/";
  });

  document.getElementById("nextLevelButton").addEventListener("click", async () => {
    await progressNext();
  });

  document.getElementById("levelSelectButton").addEventListener("click", () => {
    hideLevelCompleteOverlay();
    window.location.href = "/";
  });

  function updateHeartsUI(lives) {
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach((heart, index) => {
      if (index < lives) {
        heart.classList.remove("hidden", "lost");
      } else {
        heart.classList.add("hidden", "lost");
      }
    });
  }

  function showGameOverOverlay() {
    const overlay = document.getElementById("gameOverOverlay");
    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");
  }

function hideGameOverOverlay() {
    const overlay = document.getElementById("gameOverOverlay");
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  function updateLevelBadge(level) {
    const badge = document.getElementById("levelBadge");
    if (!badge || !level) {
      return;
    }
    const name = level.name || `Level ${level.id}`;
    badge.textContent = name;
  }

  function showLevelCompleteOverlay(level) {
    const overlay = document.getElementById("levelCompleteOverlay");
    const title = document.getElementById("levelCompleteTitle");
    if (title && level) {
      title.textContent = `🎉 ${level.name || "Level"} Complete!`;
    }
    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");
    board.inputManager.setEnabled(false);
  }

function hideLevelCompleteOverlay() {
    const overlay = document.getElementById("levelCompleteOverlay");
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  let messageTimer = null;
  function showGameMessage(text, isSuccess = false) {
    const messageEl = document.getElementById("gameMessage");
    if (!messageEl) {
      return;
    }
    messageEl.textContent = text;
    messageEl.classList.toggle("success", Boolean(isSuccess));
    messageEl.classList.add("show");
    if (messageTimer) {
      window.clearTimeout(messageTimer);
    }
    messageTimer = window.setTimeout(() => {
      messageEl.classList.remove("show");
    }, 1600);
  }

  async function progressNext() {
    try {
      const nextNumber = levelManager.currentLevelNumber + 1;
      await levelManager.load(nextNumber);
      livesManager.reset(3);
      hideLevelCompleteOverlay();
      hideGameOverOverlay();
      board.render(levelManager.getCurrent());
      board.inputManager.setEnabled(true);
      updateLevelBadge(levelManager.getCurrent());
    } catch (error) {
      console.error(error);
      // All levels complete - cycle back to level 1
      try {
        await levelManager.load(1);
        livesManager.reset(3);
        hideLevelCompleteOverlay();
        board.render(levelManager.getCurrent());
        board.inputManager.setEnabled(true);
        updateLevelBadge(levelManager.getCurrent());
      } catch (innerError) {
        console.error(innerError);
      }
    }
  }

  async function restartLevel() {
    try {
      await levelManager.restart();
      livesManager.reset(3);
      hideGameOverOverlay();
      board.render(levelManager.getCurrent());
      board.inputManager.setEnabled(true);
      board.renderer.render(levelManager.getCurrent(), board.gameStateManager.getActiveArrows());
      board.dispatchBoardEvent("LevelRestarted", { level: levelManager.getCurrent() });
    } catch (error) {
      console.error(error);
    }
  }
});
