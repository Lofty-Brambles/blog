import { DEFAULT_ASSETS, SVELTE_TEST } from "./constants.mjs";
import { SvelteManager } from "./svelte_manager.mjs";

import { normalize } from "path";
import { format } from "url";

/**
 * Config setup for passing to svelte options
 * @typedef {Object} SvelteConfig
 * @prop {import("rollup-plugin-svelte").Options} ssrOptions - options passed to the ssr-ed build
 * @prop {import("rollup-plugin-svelte").Options} clientOptions - options passed to the generation of client-side build
 * @prop {import("rollup").InputPluginOption} ssrPlugins - plugins passed to the ssr-ed build
 * @prop {import("rollup").InputPluginOption} clientPlugins - plugins passed to the client-side generated build
 */

/** @type {SvelteConfig} */
const defaultConfig = {
  ssrOptions: {},
  clientOptions: {},
  ssrPlugins: [],
  clientPlugins: [],
};

/**
 * The plugin that processes svelte components from a base handlebars template
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @param {SvelteConfig} [configOpts=defaultConfig]
 */
export function eleventySvelte(eleventyConfig, configOpts = defaultConfig) {
  const manager = new SvelteManager(DEFAULT_ASSETS, {
    ...defaultConfig,
    ...configOpts,
  });

  eleventyConfig.addExtension("svelte", {
    read: false,
    getData: true,
    init: async function () {
      await manager.build(this.config.pathPrefix, this.config.dir.output);
    },
    getInstanceFromInputPath: function (input) {
      return manager.getComponent(normalize(input));
    },
    compile: function (content, inputPath) {
      return (data) => {
        if (content)
          return typeof content === "function" ? content(data) : content;

        const component = manager.getComponent(normalize(inputPath));
        const { head, html, css } = component.ssr.render(data);
        const toString = () => html;
        return { head, html, toString, css: css.code };
      };
    },
  });

  eleventyConfig.addHandlebarsHelper("svelte_data", function (props) {
    if (typeof dataFn !== "function") return "window.__SVELTE_DATA__ = {}";
    return `window.__SVELTE_DATA__ = ${JSON.stringify(props(this.ctx))}`;
  });

  eleventyConfig.addHandlebarsShortcode("svelte_config", function (id) {
    if (!SVELTE_TEST.test(this.page.inputPath)) return;
    const component = manager.getComponent(normalize(this.page.inputPath));
    return `
    <script type="module">
      import Component from ${format(component.client)};
      new Component({ target: document.getElementById('${id}'), props: window.__SVELTE_DATA__, hydrate: true })
    </script>
    `.trim();
  });
}
