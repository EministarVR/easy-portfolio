import { create } from 'zustand';
import { GameState } from '../types/game';

const useGameStore = create<GameState>((set) => ({
  score: 0,
  isPlaying: false,
  isPaused: false,
  gameSpeed: 1,
  perspective: '3d',
  volume: 0.5,
  highScores: [],
  
  setScore: (score: number) => set({ score }),
  setPerspective: (perspective: '2d' | '3d') => set({ perspective }),
  setVolume: (volume: number) => set({ volume }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  startGame: () => set({ isPlaying: true, score: 0 }),
  endGame: () => set({ isPlaying: false }),
  setHighScores: (highScores) => set({ highScores }),
}));

export default useGameStore;