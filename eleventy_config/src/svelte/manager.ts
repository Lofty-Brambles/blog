import { DEFAULT_CACHE_DIRECTORY } from "@scripts/constants";

import type {
  InputOptions as rollupInputOptions,
  InputPluginOption as rollupPluginOption,
} from "rollup";
import type { Options as rollupSveltePluginOptions } from "rollup-plugin-svelte";

export class SvelteManager {
  constructor(
    public rollupOptions: rollupInputOptions,
    public rollupSvelteOptions: rollupSveltePluginConfig,
    public cacheDirectory: string = DEFAULT_CACHE_DIRECTORY,
    public workingDirectory: string = process.cwd(),
  ) {}
}

export type rollupSveltePluginConfig = {
  ssrOptions: Partial<rollupSveltePluginOptions>;
  ssrPlugins: rollupPluginOption;
  clientOptions: Partial<rollupSveltePluginOptions>;
  clientPlugins: rollupPluginOption;
};
