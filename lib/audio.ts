// 音声・効果音管理

export class AudioManager {
  private static instance: AudioManager;
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;
  private bgmAudio: HTMLAudioElement | null = null;
  private isBgmPlaying: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API is not supported in this browser');
      this.isEnabled = false;
    }
  }

  // 正解音（ピンポン）
  playCorrectSound() {
    if (!this.isEnabled || !this.audioContext) return;

    const oscillator1 = this.audioContext.createOscillator();
    const oscillator2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // ピンポン音の周波数
    oscillator1.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
    oscillator2.frequency.setValueAtTime(659.25, this.audioContext.currentTime); // E5

    oscillator1.type = 'sine';
    oscillator2.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

    oscillator1.start(this.audioContext.currentTime);
    oscillator2.start(this.audioContext.currentTime);
    oscillator1.stop(this.audioContext.currentTime + 0.5);
    oscillator2.stop(this.audioContext.currentTime + 0.5);
  }

  // 不正解音（ブブー）
  playIncorrectSound() {
    if (!this.isEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // ブザー音の周波数
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.8);
  }

  // ボタンクリック音
  playClickSound() {
    if (!this.isEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // ヒント表示音
  playHintSound() {
    if (!this.isEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // やわらかいチャイム音
    oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.3);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // ゲーム完了音（ファンファーレ）
  playGameCompleteSound() {
    if (!this.isEnabled || !this.audioContext) return;

    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (オクターブ上)
    
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);

        oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime);
        oscillator.type = 'triangle';

        gainNode.gain.setValueAtTime(0.2, this.audioContext!.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.4);

        oscillator.start(this.audioContext!.currentTime);
        oscillator.stop(this.audioContext!.currentTime + 0.4);
      }, index * 100);
    });
  }

  // 音声有効/無効切り替え
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  // BGM再生開始
  playBGM() {
    if (!this.isEnabled || this.isBgmPlaying) return;
    
    try {
      if (!this.bgmAudio) {
        this.bgmAudio = new Audio('/audio/music1.wav');
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 0.3; // 音量を低めに設定
      }
      
      this.bgmAudio.play().then(() => {
        this.isBgmPlaying = true;
      }).catch(error => {
        console.warn('BGMの再生に失敗しました:', error);
      });
    } catch (error) {
      console.warn('BGMの初期化に失敗しました:', error);
    }
  }

  // BGM停止
  stopBGM() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
      this.isBgmPlaying = false;
    }
  }

  // BGM音量調整
  setBGMVolume(volume: number) {
    if (this.bgmAudio) {
      this.bgmAudio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  // 音声有効状態の取得
  isAudioEnabled(): boolean {
    return this.isEnabled;
  }

  // BGM再生状態の取得
  isBGMPlaying(): boolean {
    return this.isBgmPlaying;
  }

  // ゲーム終了時の音声再生（「よくできたね」）
  playGoodJobSound() {
    if (!this.isEnabled) return;
    
    try {
      const audio = new Audio('/audio/speech.wav');
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.warn('音声再生に失敗しました:', error);
      });
    } catch (error) {
      console.warn('音声ファイルの読み込みに失敗しました:', error);
    }
  }
}

// シングルトンインスタンスをエクスポート
export const audioManager = AudioManager.getInstance();