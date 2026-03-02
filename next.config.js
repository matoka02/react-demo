// const withFonts = require('next-fonts');
// const LocalizationGenerator = require('./scripts/localizationGenerator');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // output: 'export',      // off for API-routes in pages/api/*
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,
//   },

//   webpack: (config) => {
//     const localizationGenerator = new LocalizationGenerator();
//     localizationGenerator.generateLocalizationFile();

//     return config;
//   },
// };

// // module.exports = nextConfig;
// module.exports = withFonts(nextConfig);

const LocalizationGenerator = require('./scripts/localizationGenerator');

try {
  const generator = new LocalizationGenerator();
  generator.generateLocalizationFile();
  console.log('✓ Localization generated');
} catch (error) {
  console.error('✗ Localization generation failed:', error);
  process.exit(1);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
