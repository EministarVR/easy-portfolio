import React from 'react';
import { Eye, Eye3D } from 'lucide-react';
import useGameStore from '../../store/gameStore';

const GameControls: React.FC = () => {
  const { perspective, setPerspective } = useGameStore();

  return (
    <div className="fixed bottom-4 right-4 flex gap-4">
      <button
        onClick={() => setPerspective(perspective === '2d' ? '3d' : '2d')}
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        aria-label="Switch perspective"
      >
        {perspective === '2d' ? <Eye3D size={24} /> : <Eye size={24} />}
      </button>
    </div>
  );
};

export default GameControls;