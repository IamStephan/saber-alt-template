import 'core-js'
import { merge, get } from 'lodash'
import { Node } from 'posthtml'
import { readFile } from './utils'
import { IOptions } from './types/options'

type TTokenState = Record<string, string | Function>
type TMessages = Array<{
  type: string
}>

const _handleTokens = (
  node: Node,
  tokenState: TTokenState,
  messages: Array<any>
) => {
  // Handle nodes with string contents
  if (typeof node === 'string') {
    let _node = node as string

    for (let [token, value] of Object.entries(tokenState)) {
      if (_node.includes(token)) {
        messages.push({
          type: 'altered_dom',
        })

        if (typeof value === 'function') {
          const _value = value({ readFile })
          _node = _node.replaceAll(token, _value)
        } else {
          _node = _node.replaceAll(token, value as string)
        }
      }
    }

    return _node
  }

  if (node.attrs) {
    // maybe there's a better way to check for tokens in node objects
  }

  return node
}

const _PostHTMLTokens = (options: IOptions) => (tree: Node) => {
  const messages: TMessages = []
  const _tokenNamespaces = merge({}, options.tokens ?? {})

  function traverse(
    tree: Node,
    tokenState: TTokenState,
    messages: TMessages,
    cb: Function
  ) {
    if (Array.isArray(tree)) {
      for (let i = 0; i < tree.length; i++) {
        const _node = tree[i] as Node

        if (_node.attrs && _node.attrs['token-scope']) {
          const tokenScope = _node.attrs['token-scope']

          tokenState = merge(tokenState, get(_tokenNamespaces, tokenScope))
        }

        tree[i] = traverse(
          cb(tree[i], tokenState, messages),
          tokenState,
          messages,
          cb
        )
      }
    } else if (
      tree &&
      typeof tree === 'object' &&
      Object.prototype.hasOwnProperty.call(tree, 'content')
    ) {
      traverse(tree.content as any, tokenState, messages, cb)
    }

    return tree
  }

  traverse(tree, {}, messages, _handleTokens)

  return {
    tree: tree,
    messages,
  }
}

// TODO: Add support for dynamic tokens (Maybe with a script tag like posthtml expressions does)
/**
 * Note on Tokens:
 * Tokens can only be inside attributes or string contents
 */
export default _PostHTMLTokens
