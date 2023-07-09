const {
  INPUT_DIR,
  LAYOUTS_DIR,
  OUTPUT_DIR,
  PARTIALS_DIR,
  VALID_EXTENSIONS,
} = require("./.eleventy/constants.mjs");
const { eleventySvelte } = require("./.eleventy/svelte_plugin.mjs");

/**
 * The exported config passed to 11ty
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySvelte, {
    ssrOptions: {},
    clientOptions: {},
    ssrPlugins: [],
    clientPlugins: [],
  });

  return {
    dir: {
      input: INPUT_DIR,
      includes: PARTIALS_DIR,
      layouts: LAYOUTS_DIR,
      output: OUTPUT_DIR,
      templateFormats: VALID_EXTENSIONS,
    },
  };
};
