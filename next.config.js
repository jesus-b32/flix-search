/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  images: {
    // Vercel's free tier allows only 5,000 Image Optimization transformations
    // per month. Every TMDB poster we show is already delivered by TMDB's CDN
    // at the exact size we request (e.g. /t/p/w185, /t/p/w342), so Vercel's
    // transformation pipeline adds no meaningful benefit for this project and
    // would otherwise exhaust the free tier after a handful of searches.
    // We keep using `next/image` for its layout / lazy-loading behavior, but
    // skip the transformation step entirely.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default bundleAnalyzer(config);
