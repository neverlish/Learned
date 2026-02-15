import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	serverExternalPackages: ['bun:sqlite'],
};

export default nextConfig;
