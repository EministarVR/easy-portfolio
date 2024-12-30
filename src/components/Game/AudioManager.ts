export class AudioManager {
  private bgMusic: HTMLAudioElement;
  private jumpSound: HTMLAudioElement;
  private collisionSound: HTMLAudioElement;
  private volume: number;

  constructor() {
    this.bgMusic = new Audio('https://assets.mixkit.co/music/preview/mixkit-game-level-music-689.mp3');
    this.jumpSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3');
    this.collisionSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-game-over-213.mp3');
    
    this.bgMusic.loop = true;
    this.volume = 0.5;
    
    this.setVolume(this.volume);
  }

  setVolume(volume: number) {
    this.volume = volume;
    this.bgMusic.volume = volume;
    this.jumpSound.volume = volume;
    this.collisionSound.volume = volume;
  }

  playBgMusic() {
    this.bgMusic.play();
  }

  stopBgMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }

  playJumpSound() {
    this.jumpSound.currentTime = 0;
    this.jumpSound.play();
  }

  playCollisionSound() {
    this.collisionSound.currentTime = 0;
    this.collisionSound.play();
  }
}