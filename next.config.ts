import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 静的出力を有効にする
  distDir: 'out',    // ビルド出力ディレクトリを設定
  images: {
    unoptimized: true, // 静的出力でNext.js画像を使用する場合に必要
  },
};

export default nextConfig;
