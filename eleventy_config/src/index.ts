import {
  INPUT_DIR,
  LAYOUTS_DIR,
  OUTPUT_DIR,
  PARTIALS_DIR,
  VALID_EXTENSIONS,
} from "./constants";

function config(llty: any) {
  llty

  return {
    dir: {
      input: INPUT_DIR,
      includes: PARTIALS_DIR,
      layouts: LAYOUTS_DIR,
      output: OUTPUT_DIR,
      templateFormats: VALID_EXTENSIONS,
    },
  };
}

export default config;
