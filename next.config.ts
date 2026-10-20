import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev-only: hides the floating Next.js badge so local design reviews are not cluttered
  devIndicators: false,
  // resend optionally imports @react-email/render (we only send plain text): keep it out of the bundle
  serverExternalPackages: ["resend"],
  images: {
    // AVIF first, WebP fallback — the hero water and the 3 post images are heavy PNGs
    formats: ["image/avif", "image/webp"],
    // the largest source image is the hero water (1672px wide): never generate bigger
    // variants (the 3840px default made the first hero request upscale and encode for many seconds)
    deviceSizes: [640, 750, 828, 1080, 1200, 1672],
  },
};

export default nextConfig;
