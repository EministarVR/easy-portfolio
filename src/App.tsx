import React from 'react';
import useGameStore from './store/gameStore';
import MainMenu from './components/MainMenu';
import GameEngine from './components/Game/GameEngine';

function App() {
  const isPlaying = useGameStore((state) => state.isPlaying);

  return (
    <div className="w-full h-screen">
      {!isPlaying ? <MainMenu /> : <GameEngine />}
    </div>
  );
}

export default App;