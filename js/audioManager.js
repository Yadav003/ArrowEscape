export class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    try {
      const saved = localStorage.getItem("arrow_escape_sound");
      if (saved !== null) {
        this.enabled = saved === "true";
      }
    } catch (e) {}
  }

  initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
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

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);

    gain.gain.setValueAtTime(0.08, t);
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
    osc.frequency.exponentialRampToValueAtTime(680, t + 0.16);
    osc.frequency.exponentialRampToValueAtTime(960, t + 0.28);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.04);
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
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.12);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.14);
  }

  playLifeLost() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.25);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  playLevelComplete() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A major fanfare
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
