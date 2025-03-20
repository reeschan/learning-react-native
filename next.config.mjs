/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静的出力を有効にする
  distDir: 'out',    // ビルド出力ディレクトリを設定
  images: {
    unoptimized: true, // 静的出力でNext.js画像を使用する場合に必要
  },
  // 開発中は以下のコメントを外して「npm run dev」でライブ更新する場合もあります
  // reactStrictMode: true,
  // 実機テスト時のソースマップ生成を有効にする場合は以下を使用 
  // productionBrowserSourceMaps: true,
};

export default nextConfig;