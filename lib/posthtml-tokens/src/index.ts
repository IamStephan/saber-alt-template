import 'core-js'
import { merge } from 'lodash'
import { parser as parseHtml } from 'posthtml-parser'
import { render as renderHtml, Node as RenderNode } from 'posthtml-render'
import { IOptions } from './types/options'
import { IExtendedNode } from './types/node'

const PostHTMLTokens = (options: IOptions) => (tree: IExtendedNode) => {
  let _tree = tree
  let isAltered = false
  let NodeString = renderHtml(_tree as RenderNode)

  const _globalTokens = merge({}, options.tokens ?? {})

  for (let [token, value] of Object.entries(_globalTokens)) {
    if (NodeString.includes(token)) {
      isAltered = true
      if (typeof value === 'function') {
        const _value = value()
        NodeString = NodeString.replaceAll(token, _value)
      } else {
        NodeString = NodeString.replaceAll(token, value)
      }
    }
  }

  _tree = parseHtml(NodeString) as any

  return {
    tree: _tree,
    isAltered,
  }
}

// TODO: Add ability to handle namespaced tokens
export default PostHTMLTokens
