/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'media.graphassets.com',
            }
        ]
    }
};

export default nextConfig;
