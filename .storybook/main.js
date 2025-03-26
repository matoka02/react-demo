module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  framework: {
    name: "@storybook/nextjs",
    options: {}
  },

  docs: {
    autodocs: true
  },

  addons: ['@storybook/addon-webpack5-compiler-babel', '@chromatic-com/storybook']
};
