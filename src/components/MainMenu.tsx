import React from 'react';
import { Play, Trophy, Settings } from 'lucide-react';
import useGameStore from '../store/gameStore';

const MainMenu: React.FC = () => {
  const startGame = useGameStore((state) => state.startGame);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 text-white p-4">
      <h1 className="text-6xl font-bold mb-12 text-center">Endless Runner</h1>
      
      <div className="flex flex-col gap-6 w-full max-w-md">
        <button
          onClick={startGame}
          className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105"
        >
          <Play size={24} />
          Play Game
        </button>
        
        <button
          onClick={() => {}}
          className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105"
        >
          <Trophy size={24} />
          High Scores
        </button>
        
        <button
          onClick={() => {}}
          className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105"
        >
          <Settings size={24} />
          Settings
        </button>
      </div>
    </div>
  );
};