/** @type {import('next').NextConfig} */
const SURVEY_FORM_URL = "https://forms.gle/i5YCRkvWt2quXaxU7";

const nextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/survey",
        destination: SURVEY_FORM_URL,
        permanent: false,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev && process.env.NEXT_DEV_WEBPACK === "1") {
      // Prevent stale chunk references (e.g. Cannot find module './948.js')
      config.cache = false;
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
