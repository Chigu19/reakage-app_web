/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle WebSocket dependencies for Supabase
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        bufferutil: false,
        "utf-8-validate": false,
      };
    }

    // Ignore critical dependency warnings from Supabase realtime
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },

  // Optional: Add experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: ["@supabase/supabase-js"],
  },

  // Handle environment variables
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;
