import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  // Type or Press `Ctrl + Space` for autocompletion
};

export default config;

module.exports = {
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['~/assets/sass/index.scss']
  }
};
