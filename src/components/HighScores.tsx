import React, { useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { supabase } from '../utils/supabase';

const HighScores: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { highScores, setHighScores } = useGameStore();

  useEffect(() => {
    const fetchHighScores = async () => {
      const { data, error } = await supabase
        .from('high_scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (!error && data) {
        setHighScores(data);
      }
    };

    fetchHighScores();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">High Scores</h2>
        
        <div className="space-y-4 mb-6">
          {highScores.map((score, index) => (
            <div
              key={score.id || index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <span className="font-bold">{score.playerName}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({score.perspective})
                </span>
              </div>
              <span className="text-lg font-semibold">{score.score}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HighScores;