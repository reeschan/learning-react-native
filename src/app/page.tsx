'use client';

import { useState, useEffect } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import CounterSection from '@/components/CounterSection';
import CameraSection from '@/components/CameraSection';
import GeolocationSection from '@/components/GeolocationSection';

export default function Home() {
  // クライアントサイドレンダリングの場合はウィンドウが存在するか確認する
  const isCapacitorAvailable = typeof window !== 'undefined' && 'Capacitor' in window;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-900 text-white">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Next.js 15 + Capacitor App
        </h1>
        
        {/* コンポーネントセクション */}
        <div className="space-y-6">
          <CounterSection />
          
          {isCapacitorAvailable ? (
            <>
              <CameraSection />
              <GeolocationSection />
            </>
          ) : (
            <div className="p-4 bg-yellow-900/30 rounded-lg text-yellow-400">
              <p>Capacitor は Web ブラウザでは利用できません。iOS または Android アプリとして実行してください。</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}