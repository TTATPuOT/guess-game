import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {
        rules: {
            '*.yml': {
                loaders: ['yaml-loader'],
                as: '*.js'
            },
            '.editorconfig': {
                loaders: ['raw-loader'],
                as: '*.js'
            },
        },
    },
};

export default nextConfig;
