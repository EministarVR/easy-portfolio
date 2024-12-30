export type PlayerState = 'running' | 'jumping' | 'sliding';

export interface GameState {
  score: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameSpeed: number;
  perspective: '2d' | '3d';
  volume: number;
  highScores: HighScore[];
  
  setScore: (score: number) => void;
  setPerspective: (perspective: '2d' | '3d') => void;
  setVolume: (volume: number) => void;
  togglePause: () => void;
  startGame: () => void;
  endGame: () => void;
  setHighScores: (highScores: HighScore[]) => void;
}

export interface HighScore {
  id?: string;
  playerName: string;
  score: number;
  date: string;
  perspective: '2d' | '3d';
}