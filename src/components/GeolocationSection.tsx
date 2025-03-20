'use client';

import { useState } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const GeolocationSection = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = async () => {
    setLoading(true);
    setError(null);

    try {
      const position: Position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy || 0
      });
    } catch (err) {
      console.error('位置情報エラー:', err);
      setError('位置情報の取得中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">位置情報機能</h2>
      <div className="flex flex-col items-center">
        <button
          onClick={getCurrentPosition}
          disabled={loading}
          className={`px-5 py-2 text-white font-medium rounded-lg transition-colors mb-6 ${
            loading 
              ? 'bg-amber-700 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700'
          }`}
        >
          {loading ? '取得中...' : '現在地を取得'}
        </button>

        {error && (
          <div className="mb-4 w-full p-3 bg-red-900/30 text-red-400 rounded-lg">
            {error}
          </div>
        )}
        
        {location && (
          <div className="w-full p-4 bg-gray-700 rounded-lg text-gray-200">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold">緯度:</div>
              <div>{location.latitude.toFixed(6)}</div>
              
              <div className="font-semibold">経度:</div>
              <div>{location.longitude.toFixed(6)}</div>
              
              <div className="font-semibold">精度:</div>
              <div>{location.accuracy.toFixed(1)}m</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GeolocationSection;