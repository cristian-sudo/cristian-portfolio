import type { NextConfig } from "next";

const imageDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

const nextConfig: NextConfig = {
    images: {
        remotePatterns: imageDomain
            ? [
                {
                    protocol: 'https',
                    hostname: imageDomain,
                    pathname: '/**',
                },
            ]
            : [],
    },
};

export default nextConfig;