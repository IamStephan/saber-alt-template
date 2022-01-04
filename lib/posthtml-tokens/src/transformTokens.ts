import { Node } from "posthtml";
import { parser as parseHtml } from "posthtml-parser";
import { render as renderHtml, Node as RenderNode } from "posthtml-render";
import { IOptions } from "./types/options.d";

const TokenNestedLimit = 50;

function transformTokens(node: Node | Node[], tokenData: IOptions["tokens"]) {
  let isComplete = false;
  let NodeString = renderHtml(node as RenderNode);
  let tokenCounter: Record<string, number> = {};

  while (!isComplete) {
    isComplete = true;

    for (let [token, value] of Object.entries(tokenData)) {
      if (NodeString.includes(token)) {
        isComplete = false;

        if (
          typeof tokenCounter[token] === "number" &&
          tokenCounter[token] >= TokenNestedLimit
        ) {
          throw new Error(
            `${token} token is nested too deeply, this might be an infinite loop issue`
          );
        }

        if (typeof value === "function") {
          const _value = value();
          NodeString = NodeString.replaceAll(token, _value);
        } else {
          NodeString = NodeString.replaceAll(token, value);
        }

        tokenCounter[token] =
          typeof tokenCounter[token] === "number" ? tokenCounter[token] + 1 : 1;
      }
    }
  }

  return parseHtml(NodeString) as Node | Node[];
}

export default transformTokens;
