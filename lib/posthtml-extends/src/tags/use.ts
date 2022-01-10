import fs from 'fs'
import { Node } from 'posthtml'
import { parser as parseToPostHtml } from 'posthtml-parser'

import match from '../utils/match'
import getNodePath from '../utils/getNodePath'
import _handleSlotFill from '../tags/slotFill'
import { IOptions } from '../types/options'

export default function _handleUseNodes(
  tree: Node,
  options: IOptions,
  messages: Array<any>
) {
  const nodeExp = Object.keys(options.useTags).map((tag) => ({ tag }))
  let _tree = tree

  match(_tree, nodeExp, (useNode) => {
    let useNodeContentPath: string
    let useNodeContent: string

    // This is a reference item
    messages.push({
      type: 'altered_dom',
    })

    try {
      useNodeContentPath = getNodePath(useNode, options.useTags)
    } catch (e) {
      console.warn(`Could not load file: ${e}`)
      return useNode
    }

    try {
      useNodeContent = fs.readFileSync(useNodeContentPath, 'utf-8')
    } catch (e) {
      console.warn(`Could not load file: ${e}`)
      return useNode
    }

    // Recursively repeat this logic until the entire tree is built
    const newTree = parseToPostHtml(useNodeContent) as any

    // Remove the tag from the ouput tree but keep it intact for the AST
    useNode.tag = false as any

    // Slot and fill behaviour
    useNode.content = [_handleSlotFill(newTree, useNode)]

    return useNode
  })

  return _tree
}
