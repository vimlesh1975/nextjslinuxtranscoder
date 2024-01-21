/** @type {import('next').NextConfig} */
const webpack = require('webpack');

module.exports = {
  images: {
    // Use remotePatterns to specify the remote domain for images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vimleshs3001.s3.ap-south-1.amazonaws.com',
        pathname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add your plugins here
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': JSON.stringify(false),
      })
    );

    // Add any other webpack configurations if needed

    return config;
  },
};
