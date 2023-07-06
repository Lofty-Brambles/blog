import { eleventySvelte } from "@scripts/svelte";

import {
  INPUT_DIR,
  LAYOUTS_DIR,
  OUTPUT_DIR,
  PARTIALS_DIR,
  VALID_EXTENSIONS,
} from "@scripts/constants";

const dir = {
  input: INPUT_DIR,
  includes: PARTIALS_DIR,
  layouts: LAYOUTS_DIR,
  output: OUTPUT_DIR,
  templateFormats: VALID_EXTENSIONS,
};

export default function config(lltyConfig: any) {
  lltyConfig.addPlugin(eleventySvelte);
  return { dir };
}
