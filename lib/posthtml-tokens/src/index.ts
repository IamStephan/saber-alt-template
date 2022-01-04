import "core-js";
import { Node } from "posthtml";
import { merge } from "lodash";
import transformTokens from "./transformTokens";
import { IOptions } from "./types/options.d";

const PostHTMLTokens = (options: IOptions) => (tree: Node) => {
  let _tree = tree;

  const _globalTokens = merge({}, options.tokens ?? {});
  _tree = transformTokens(_tree, _globalTokens) as Node;

  return _tree;
};

// TODO: Make use of `tree.messages.push` to indicate if changes took place
// TODO: Add ability to handle namespaced tokens
export default PostHTMLTokens;
