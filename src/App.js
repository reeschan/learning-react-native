import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      
      setPhotoUrl(photo.webPath);
    } catch (error) {
      console.error('カメラエラー:', error);
    }
  };

  const getCurrentPosition = async () => {
    setLoading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    } catch (error) {
      console.error('位置情報エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My First React + Capacitor App</h1>
        
        <div className="feature-section">
          <h2>カウンター機能</h2>
          <p>カウント: {count}</p>
          <div className="button-container">
            <button onClick={() => setCount(count - 1)}>減らす</button>
            <button onClick={() => setCount(count + 1)}>増やす</button>
          </div>
        </div>
        
        <div className="feature-section">
          <h2>カメラ機能</h2>
          <button className="camera-button" onClick={takePhoto}>
            写真を撮る
          </button>
          
          {photoUrl && (
            <div className="photo-container">
              <img src={photoUrl} alt="撮影した写真" />
            </div>
          )}
        </div>
        
        <div className="feature-section">
          <h2>位置情報機能</h2>
          <button 
            className="geo-button" 
            onClick={getCurrentPosition}
            disabled={loading}
          >
            {loading ? '取得中...' : '現在地を取得'}
          </button>
          
          {location && (
            <div className="location-info">
              <p>緯度: {location.latitude.toFixed(6)}</p>
              <p>経度: {location.longitude.toFixed(6)}</p>
              <p>精度: {location.accuracy.toFixed(1)}m</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;