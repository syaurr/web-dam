// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { // <-- Tambahkan properti images di sini
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lsrqqteeudsaujglargo.supabase.co', // <--- Ganti dengan hostname Supabase Anda
        port: '', // Biarkan kosong
        pathname: '/storage/v1/object/public/**', // Atau sesuaikan jika perlu
      },
    ],
  },
  /* config options here */ // Pastikan ada koma jika ada properti lain setelah 'images'
};

export default nextConfig;