import { Node } from 'posthtml'
import { FillType } from './getFillType'

export default function mergeContent(
  fillNode: Node['content'],
  slotNode: Node['content'],
  fillType: FillType
) {
  fillNode = fillNode || []
  slotNode = slotNode || []

  switch (fillType) {
    case 'replace':
      slotNode = fillNode
      break

    case 'prepend':
      slotNode = fillNode.concat(slotNode)
      break

    case 'append':
      slotNode = slotNode.concat(fillNode)
      break
    default:
      break
  }

  return slotNode
}
