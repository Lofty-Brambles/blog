const input = "source";
const output = "build";

/**
 * @callback Compile
 * @param {string} inputContent - stringified content of the file
 * @param {string} inputPath - path to the file
 * @returns {(void|function())} - render function
 */

/**
 * @typedef CompileOptions
 * @type {Object}
 * @prop {Compile} permaLink - provides a function to render a link to the output
 * @prop {Boolean} spiderJavaScriptDependencies - look up and watch the deps
 * @prop {Boolean} cache - passes caching defaults, synced to the read option by default
 */

/**
 * @typedef TemplateConfig
 * @type {Object}
 * @prop {Compile} compile - the compiling function
 * @prop {string} outputFileExtension - the final extenstion, defaults to html
 * @prop {(Boolean|function())} getData - adds extra data to the data cascade
 * @prop {Function} init - the function that runs once
 * @prop {Boolean} read - boolean on if it is to be compiled by 11ty
 * @prop {CompileOptions} compileOptions - further options to pass to the compiling
 * @prop {function()} isIncrementalMatch - this callback determines if a dep needs to be rebuilt
 */

/** @param {TemplateConfig} tm - Totum files handler */
const templateFormats = {
  "tm": {
    read: false,
    compile: require("../source/pipes/totum/index")
  }
};

/**
 * This function is the main 11ty config
 * @param {import("@11ty/eleventy").UserConfig} config
 */
module.exports = function (config) {
  const addExtension = ([name, ext]) => config.addExtension(name, ext);
  Object.entries(templateFormats).forEach(addExtension);

  return {
    dir: { input, output },
    templateFormats: Object.keys(templateFormats),
  };
};
