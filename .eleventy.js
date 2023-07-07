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

if (!require("node:fs").existsSync(`${ELEVENTY_OUT_DIR}/index.js`))
  require("esbuild").buildSync({
    entryPoints: [ELEVENTY_ENTRY],
    bundle: true,
    platform: PLATFORM,
    format: FORMAT,
    outdir: ELEVENTY_OUT_DIR,
    alias: ALIASES,
    packages: "external",
    ...MODE_DECISIONS,
  });

module.exports = require(`${ELEVENTY_OUT_DIR}/index.js`);
