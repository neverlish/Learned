import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["bun:sqlite"],
	},
};

export default nextConfig;
