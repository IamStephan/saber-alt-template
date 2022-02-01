import 'core-js'
import { merge, get } from 'lodash'
import { Node } from 'posthtml'
import * as yup from 'yup'
import { readFile } from './utils'
import { IOptions } from './types/options'

type TTokenState = Record<string, string | Function>
type TMessages = Array<{
  type: string
}>

const AddTokenScopeMessage = yup.object({
  type: yup.string().oneOf(['add_token_scope']).required(),
  handled: yup.bool().optional(),
  scopeName: yup.string().required(),
  data: yup.object().required(),
})

const _handleTokens = (
  node: Node,
  tokenState: TTokenState,
  messages: Array<any>
) => {
  const _replaceToken = (text: string, shouldLog?: boolean) => {
    let _text = text

    for (let [token, value] of Object.entries(tokenState)) {
      if (text.includes(token)) {
        messages.push({
          type: 'altered_dom',
        })

        if (shouldLog) {
          console.log('found change')
        }

        if (typeof value === 'function') {
          const _value = value({ readFile })
          _text = text.replaceAll(token, _value)
        } else {
          _text = text.replaceAll(token, value as string)
        }
      }
    }

    return _text
  }
  // Handle nodes with string contents
  if (typeof node === 'string') {
    return _replaceToken(node as string)
  }

  // Hanle tokens in attributes
  if (node.attrs) {
    /**
     * NOTE:
     * ======
     * Instead of looping over node attributes, I'm converting the
     * obj to a string, replacing them and reconvert to an obj.
     *
     * This is much faster than looping over every attr of a node
     * and checking/replacing tokens.
     */
    let _attr = JSON.stringify(node.attrs)
    node.attrs = JSON.parse(_replaceToken(_attr))
  }

  return node
}

const PostHTMLTokens =
  (options: IOptions) => (tree: Node, messages: Array<any>) => {
    const _tokenNamespaces = merge({}, options.tokens ?? {})
    let initialTokenState = {}

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

    messages = messages.map((message) => {
      if (AddTokenScopeMessage.isValidSync(message) && !message.handled) {
        return {
          ...messages,
          handled: true,
        }
      }

      return message
    })

    traverse(tree, initialTokenState, messages, _handleTokens)

    return tree
  }

// TODO: Add support for dynamic tokens (Maybe with a script tag like posthtml expressions does)
export default PostHTMLTokens
