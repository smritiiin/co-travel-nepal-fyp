// /** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',register: true,
    skipWaiting: true,
})

module.exports = withPWA({
  pwa:{
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["localhost", "openweathermap.org"],
  },
});

// module.exports = nextConfig

// next.config.js
// module.exports = {
//   images: {
//     domains: ["localhost", "openweathermap.org"],
//   },
// };
