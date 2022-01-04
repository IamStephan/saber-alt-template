import { Node } from "posthtml";
import { merge } from "lodash";
import { IOptions } from "./types/options";
import { TemplateUseTags } from "./constants/useTags";

import handleUseTag from "./tags/use";
import handleTemplateTags from "./tags/template";

const DefaultOptions: Partial<IOptions> = {
  useTags: {
    ...TemplateUseTags,
  },
};

const PostHTMLExtends = (options: IOptions) => (tree: Node) => {
  const mergedOptions = merge(DefaultOptions, options);
  let _tree = tree;

  // Build the entire tree
  _tree = handleUseTag(_tree, mergedOptions);

  // Handle template definitions
  _tree = handleTemplateTags(_tree, mergedOptions);

  return _tree;
};

// TODO: Make use of `tree.messages.push` to indicate if changes took place
// TODO: correct relative imports first before inserting into the main AST
export default PostHTMLExtends;
