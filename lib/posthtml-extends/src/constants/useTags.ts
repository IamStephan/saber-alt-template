import { IOptions } from "../types/options";

export const TemplateUseTags: IOptions["useTags"] = {
  use: {
    path: "./",
    default: "",
  },
  page: {
    path: "./src/globals",
    default: "./page_base.html",
  },
  component: {
    path: "./src/components",
  },
  widget: {
    path: "./src/widgets",
  },
};
