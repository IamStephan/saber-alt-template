import { Node } from 'posthtml'
import { IOptions } from '../types/options'

// TODO: take into account env mode
function _handleSlotFill(node: Node, options: IOptions) {
  let _tree = node

  _tree.match({ tag: 'template' }, node => {
    return {
      ...node,
      tag: false as any,
    }
  })

  return _tree
}

export default _handleSlotFill
