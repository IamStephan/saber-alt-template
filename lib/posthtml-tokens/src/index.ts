import 'core-js'
import { merge } from 'lodash'
import { parser as parseHtml } from 'posthtml-parser'
import { render as renderHtml, Node as RenderNode } from 'posthtml-render'
import { readFile } from './utils'
import { IOptions } from './types/options'
import { IExtendedNode } from './types/node'

const PostHTMLTokens = (options: IOptions) => (tree: IExtendedNode) => {
  const messages = []
  let _tree = tree
  let NodeString = renderHtml(_tree as RenderNode)

  const _globalTokens = merge({}, options.tokens ?? {})

  for (let [token, value] of Object.entries(_globalTokens)) {
    if (NodeString.includes(token)) {
      messages.push({
        type: 'altered_dom',
      })
      if (typeof value === 'function') {
        const _value = value({ readFile })
        NodeString = NodeString.replaceAll(token, _value)
      } else {
        NodeString = NodeString.replaceAll(token, value)
      }
    }
  }

  _tree = parseHtml(NodeString) as any

  return {
    tree: _tree,
    messages,
  }
}

/**
 * TODO: Better support for token getters.
 * =============
 * Some Tokens are simple file reads. So maybe have a way
 * to fetch the files without needing to have a function
 * call.
 */
// TODO: Add support for dynamic tokens
// TODO: Add ability to handle namespaced tokens
export default PostHTMLTokens
