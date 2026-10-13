// Web Audio API Synthesizer for Kahoot-style Sound Effects
// No external audio files needed; 100% offline and instant!

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initOnFirstInteraction = this.initOnFirstInteraction.bind(this);
    window.addEventListener('click', this.initOnFirstInteraction, { once: true });
    window.addEventListener('keydown', this.initOnFirstInteraction, { once: true });
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initOnFirstInteraction() {
    this.init();
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.15, startTime = 0, gainLevel = 0.2) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + startTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(gainLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  tick() {
    if (this.muted) return;
    this.playTone(800, 'triangle', 0.04, 0, 0.08);
  }

  hurryTick() {
    if (this.muted) return;
    this.playTone(1200, 'square', 0.05, 0, 0.1);
  }

  correct() {
    if (this.muted) return;
    this.init();
    // Uplifting arpeggio: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.25, idx * 0.07, 0.25);
    });
  }

  streakBonus() {
    if (this.muted) return;
    this.init();
    // High celebratory sparkle
    const notes = [659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.2, idx * 0.05, 0.2);
    });
  }

  wrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  timeOut() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.4);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }

  buttonClick() {
    if (this.muted) return;
    this.playTone(440, 'sine', 0.06, 0, 0.12);
  }

  gameFinish() {
    if (this.muted) return;
    this.init();
    // Kahoot podium triumphant fanfare
    const melody = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 0.12 },
      { f: 783.99, d: 0.12, t: 0.24 },
      { f: 1046.50, d: 0.35, t: 0.36 },
      { f: 880.00, d: 0.15, t: 0.75 },
      { f: 1046.50, d: 0.5, t: 0.95 }
    ];
    melody.forEach(m => {
      this.playTone(m.f, 'triangle', m.d, m.t, 0.28);
    });
  }
}

const sound = new SoundController();
