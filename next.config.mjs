// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ! FIX TẠM CORS

    async rewrites() {
        return [
            {
                source: "/api/:path*", // Đường dẫn frontend
                destination: "http://3.107.202.61:8080/api/:path*", // API backend
            },
        ];
    },
};

export default nextConfig;
