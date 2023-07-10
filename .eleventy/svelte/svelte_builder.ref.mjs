import { globby } from "globby";

import { MARKDOC_GLOB_TEST, SVELTE_GLOB_TEST } from "../constants.mjs";

/**
 * This is the main handler class for generating builds from svelte components
 * @class SvelteBuilder
 */
export class SvelteBuilder {
  /** @type {Object[]} */
  #componentCache;
  /** @type {string} */
  #assetPath;
  /** @type {Object} */
  #config;

  /**
   * Constructor for the default build manager of svelte files
   * @param {string} assetPath a path prefixer to store client-side cache
   * @param {Object} config
   */
  constructor(assetPath, config) {
    this.#componentCache = [];
    this.#assetPath = assetPath;
    this.#config = { ...config, ...defaultConfig };
  }

  /** @typedef {import("rollup-plugin-svelte").Options} RollupSvelteOptions */
  /** @typedef {import("rollup").InputPluginOption} RollupPlugin */

  #clientBundle() {}
  #ssrBundle() {}
  async build() {
    const sveltePages = await globby(SVELTE_GLOB_TEST);
    const markdocPages = await globby(MARKDOC_GLOB_TEST);

    const [ssr, _] = await Promise.all([
      Promise.all(this.#ssrBundle({ sveltePages, markdocPages })),
      Promise.all(this.#clientBundle({ sveltePages, markdocPages })),
    ]);

    // - use different preprocessors and just pipe them
  }
}
