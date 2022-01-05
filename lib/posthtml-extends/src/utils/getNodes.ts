import { Node } from 'posthtml'
import match from '../utils/match'

export default function getNodes(tag: string, tree: Node | Node['content']) {
  const nodes: any = {}

  match(tree, { tag }, (node) => {
    if (!node.attrs || !node.attrs.name) {
      console.warn('No name was provided')
      return node
    }

    nodes[node.attrs.name] = node
    return node
  })

  return nodes
}
