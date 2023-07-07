import { SvelteManager } from "@scripts/svelte/manager";

import type { InputOptions as rollupInputOptions } from "rollup";
import type { rollupSveltePluginConfig } from "@scripts/svelte/manager";

export function eleventySvelte(eleventy: any, configOpts = pluginDefaults) {
  const manager = new SvelteManager(
    configOpts.rollupOptions,
    configOpts.rollupSvelteOptions,
  );

  eleventy.addFilter("svelte_data", function (this: FilterThisType, dataFn: unknown) {
    if (typeof dataFn !== "function") return "window.__SVELTE_DATA__ = {}";
    return `window.__SVELTE_DATA__ = ${JSON.stringify(dataFn(this.ctx))}`;
  });

  eleventy.addExtension("svelte", {
    outputFileExtension: "html",
    compile: async function (inputContent: string, inputPath: string) {},
  });
}

type ConfigOptions = {
  rollupOptions: rollupInputOptions;
  rollupSvelteOptions: rollupSveltePluginConfig;
};

const pluginDefaults: ConfigOptions = {
  rollupOptions: {},
  rollupSvelteOptions: {
    ssrOptions: {},
    ssrPlugins: [],
    clientOptions: {},
    clientPlugins: [],
  },
};

type FilterThisType = {
  eleventy: any;
  page: {
    url: string;
    fileSlug: string;
    filePathStem: string;
    date: Date;
    inputPath: string;
    outputPath: string;
    outputFileExtension: string;
    lang: string;
  };
};
