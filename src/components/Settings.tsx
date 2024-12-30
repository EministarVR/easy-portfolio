import React from 'react';
import useGameStore from '../store/gameStore';

const Settings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { perspective, volume, setPerspective, setVolume } = useGameStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Perspective
            </label>
            <select
              value={perspective}
              onChange={(e) => setPerspective(e.target.value as '2d' | '3d')}
              className="w-full p-2 border rounded"
            >
              <option value="2d">2D</option>
              <option value="3d">3D</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;