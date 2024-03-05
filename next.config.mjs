/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'media.graphassets.com',
            }
        ]
    },
    experimental: {
        workerThreads: false,
        cpus: 1
    },
};

export default nextConfig;
