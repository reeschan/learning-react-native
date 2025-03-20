'use client';

import { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

const CameraSection = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const takePhoto = async () => {
    setError(null);
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      
      setPhotoUrl(photo.webPath || null);
    } catch (err) {
      console.error('カメラエラー:', err);
      setError('写真の撮影中にエラーが発生しました。');
    }
  };

  return (
    <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">カメラ機能</h2>
      <div className="flex flex-col items-center">
        <button
          onClick={takePhoto}
          className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors mb-6"
        >
          写真を撮る
        </button>

        {error && (
          <div className="mb-4 w-full p-3 bg-red-900/30 text-red-400 rounded-lg">
            {error}
          </div>
        )}
        
        {photoUrl && (
          <div className="w-full max-w-sm overflow-hidden rounded-lg border-2 border-gray-700">
            <img 
              src={photoUrl} 
              alt="撮影した写真" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CameraSection;