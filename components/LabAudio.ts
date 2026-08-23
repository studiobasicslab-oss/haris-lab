// Client-side Web Audio API synthesizer for ambient lab soundscapes & UI sonics

class LabAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public toggleAmbient(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbientDrone();
    } else {
      this.stopAmbientDrone();
    }

    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  private startAmbientDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.stopAmbientDrone();

    // Create subtle warm ambient frequencies (F# drone: 92.5Hz, 185Hz, 277.18Hz)
    const baseFreqs = [92.5, 138.59, 185.0, 277.18];
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
    this.ambientGain.connect(this.masterGain);

    baseFreqs.forEach((freq) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detune for rich celestial shimmer
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx.currentTime);

      if (panner) {
        panner.pan.setValueAtTime((Math.random() - 0.5) * 0.6, this.ctx.currentTime);
        osc.connect(panner);
        panner.connect(this.ambientGain);
      } else {
        osc.connect(this.ambientGain);
      }

      osc.start();
      this.ambientOscillators.push(osc);
    });
  }

  private stopAmbientDrone() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        this.ambientOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        this.ambientOscillators = [];
      }, 1250);
    }
  }

  // Micro UI feedback sonics
  public playBlip(freq = 580) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context might be suspended
    }
  }

  public playChime() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.65);
      });
    } catch {
      // Context suspended
    }
  }
}

export const labAudio = new LabAudioEngine();
