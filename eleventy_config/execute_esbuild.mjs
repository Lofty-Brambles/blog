import { build, context } from "esbuild";

const ELEVENTY_ENTRY = "eleventy_config/src/index.ts";
const ELEVENTY_OUT_DIR = "eleventy_config/dist";
const PLATFORM = "node";
const FORMAT = "cjs";

const ALIASES = {
  "@scripts/*": "eleventy_config/src/*",
};
const MODE_DECISIONS = process.env.DEV
  ? { sourcemap: "external", minify: false }
  : { minify: true };

const config = {
  entryPoints: [ELEVENTY_ENTRY],
  bundle: true,
  platform: PLATFORM,
  format: FORMAT,
  outdir: ELEVENTY_OUT_DIR,
  alias: ALIASES,
  packages: "external",
  ...MODE_DECISIONS,
};

process.env.MODE === "watch"
  ? await (await context(config)).watch()
  : await build(config);
