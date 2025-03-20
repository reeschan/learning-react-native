'use client';

import { useState } from 'react';

const CounterSection = () => {
  const [count, setCount] = useState(0);

  return (
    <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">カウンター機能</h2>
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold mb-6">{count}</p>
        <div className="flex gap-4">
          <button
            onClick={() => setCount(prev => prev - 1)}
            className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            減らす
          </button>
          <button
            onClick={() => setCount(prev => prev + 1)}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            増やす
          </button>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;