export default {
  devIndicators: false,
  async redirects() {
    return [{
      source: '/opengraph-image',
      destination: '/images/reset-regen-share-v1.jpg',
      permanent: true,
    }];
  },
};
