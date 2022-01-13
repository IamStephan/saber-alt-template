import { Node } from 'posthtml'

import match from '../utils/match'

const handleWidgets = (tree: Node) => {
  match(tree, { tag: 'widget' }, (node: Node) => {
    return {
      ...node,
      tag: false as any,
    }
  })

  return tree
}

/**
 * Handle the usage of widgets inside template
 */
export { handleWidgets }
