/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: false,
  },
};

export default nextConfig;

export const config = {
  matcher: ['/dashboard', '/settings', '/subscribe'], // добавь сюда нужные приватные страницы
}
