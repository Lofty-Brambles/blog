import { rollup } from "rollup";
import svelte from "rollup-plugin-svelte";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { DEFAULT_CLIENTS, SVELTE_GLOB_TEST } from "./constants.mjs";

import { join, relative } from "path";
import { globby } from "globby";

/**
 * Config setup for passing to svelte options
 * @typedef {Object} SvelteConfig
 * @prop {import("rollup-plugin-svelte").Options} ssrOptions - options passed to the ssr-ed build
 * @prop {import("rollup-plugin-svelte").Options} clientOptions - options passed to the generation of client-side build
 * @prop {import("rollup").InputPluginOption} ssrPlugins - plugins passed to the ssr-ed build
 * @prop {import("rollup").InputPluginOption} clientPlugins - plugins passed to the client-side generated build
 */

export class SvelteManager {
  #components = [];
  #svelteConfig = {
    ssrOptions: {},
    clientOptions: {},
    ssrPlugins: [],
    clientPlugins: [],
  };

  /**
   * Constructor for the default build manager of svelte files
   * @param {string} assetPath a directory name to store generated client-side assets
   * @param {SvelteConfig} svelteConfig the options passed to the rollup plugins
   */
  constructor(assetPath, svelteConfig) {
    this.#assetPath = assetPath;
    this.#svelteConfig = svelteConfig;
  }

  /**
   * the function to generate the client bundle for a svelte component
   * @param {Array.<string>} inputs - array of paths of svelte components passed to generate client bundles from
   * @param {string} outDir - name of the output directory to which client assets get built to
   */
  async #clientBundle(inputs, outDir) {
    /** @type {import("rollup-plugin-svelte").Options} */
    const svelteOptions = {
      ...this.#svelteConfig.clientOptions,
      compilerOptions: {
        ...this.#svelteConfig.clientOptions.compilerOptions,
        hydratable: true,
      },
    };

    /** @type {import("@rollup/plugin-node-resolve").RollupNodeResolveOptions} */
    const nodeResolverOptions = { browser: true, dedupe: ["svelte"] };

    const plugins = [
      svelte(svelteOptions),
      nodeResolve(nodeResolverOptions),
      ...this.#svelteConfig.clientPlugins,
    ];

    const build = await rollup({ input: inputs, plugins });
    build.write({
      dir: join(outDir, this.#assetPath, DEFAULT_CLIENTS),
      format: "esm",
      exports: "named",
    });
  }

  /**
   * the function to create a pre-rendered svelte component
   * @param {string} input - input path to a svelte component
   * @returns {import("rollup").RollupOutput}
   */
  async #ssrBundle(input) {
    /** @type {import("rollup-plugin-svelte").Options} */
    const svelteOptions = {
      ...this.#svelteConfig.ssrOptions,
      compilerOptions: {
        ...this.#svelteConfig.ssrOptions.compilerOptions,
        generate: "ssr",
        hydratable: true,
      },
    };

    const plugins = [svelte(svelteOptions), ...this.#svelteConfig.ssrPlugins];
    const build = await rollup({ input, plugins, external: [/^svelte/] });
    return build.generate({ format: "cjs", exports: "named" });
  }

  /**
   * the function to generate a build for a svelte components
   * @param {string} pathPrefix - node to generate build
   * @param {string} outDir - directory to generate client build
   */
  async build(pathPrefix, outDir) {
    const inputs = await globby(SVELTE_GLOB_TEST);
    const [ssr, _] = await Promise.all([
      Promise.all(inputs.map((input) => this.#ssrBundle(input))),
      this.#clientBundle(inputs, outDir),
    ]);

    for (let {
      output: [entry],
    } of ssr) {
      if (!entry.facadeModuleId) continue;

      const scope = requireFromString(entry.code, entry.facadeModuleId);
      const path = relative(process.cwd(), entry.facadeModuleId);
      const clientPath = join(
        pathPrefix,
        this.#assetPath,
        DEFAULT_CLIENTS,
        entry.fileName,
      );

      const component = {
        ssr: scope.default,
        data: scope.data,
        client: clientPath,
      };
      this.#components[path] = component;
    }
  }

  /**
   * Function to get a component reference
   * @param {string} path - the component's path
   * @returns - an objective reference to a component
   */
  getComponent(path) {
    if (!this.#components[path])
      throw new Error(`${path} is not a valid path.`);
    return this.#components[path];
  }
}

/**
 * A method to require a file's content in memory
 * @param {string} source - the main require-string
 * @param {string} fileName - the file path
 * @returns the exported value
 */
function requireFromString(source, filename) {
  const m = new module.constructor();
  m.paths = module.paths;
  m._compile(source, filename);
  return m.exports;
}
