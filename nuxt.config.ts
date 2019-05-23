import NuxtConfiguration from "@nuxt/config";

const config: NuxtConfiguration = {
  // Type or Press `Ctrl + Space` for autocompletion
};

export default config;

module.exports = {
  modules: ["@nuxtjs/style-resources"],
  styleResources: {
    scss: ["~/assets/sass/index.scss"]
  },
  head: {
    titleTemplate: "Drill Mania",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  }
};
