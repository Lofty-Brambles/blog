import {
  INPUT_DIR,
  LAYOUTS_DIR,
  OUTPUT_DIR,
  PARTIALS_DIR,
  VALID_EXTENSIONS,
} from "./constants.mjs";

/**
 * Typing for the dir attribute of Eleventy Config Return
 * @typedef {Object} DirectoryOptions
 * @prop {string} [input]
 * @prop {string} [includes]
 * @prop {string} [layouts]
 * @prop {string} [data]
 * @prop {string} [output]
 */

/**
 * Return type of the object passed by the eleventy config.
 * @typedef {Object} EleventyConfigReturn
 * @prop {DirectoryOptions} [dir]
 * @prop {string} [markdownTemplateEngine]
 * @prop {string} [htmlTemplateEngine]
 * @prop {(string | string[])} [templateFormats]
 * @prop {string} [htmlOutputSuffix]
 *
 */

/**
 * Exported config passed on to eleventy directly.
 * @param {import("@11ty/eleventy").UserConfig} config
 * @returns {EleventyConfigReturn}
 */
module.exports = function (config) {
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
