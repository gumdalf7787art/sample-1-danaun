export default {
  devIndicators: false,
  async redirects() {
    return [{
      source: '/opengraph-image',
      destination: '/images/danaun-walking.png',
      permanent: true,
    }];
  },
};
