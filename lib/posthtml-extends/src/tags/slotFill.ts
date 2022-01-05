import { Node } from 'posthtml'
import getNodes from '../utils/getNodes'
import getFillType from '../utils/getFillType'
import mergeContent from '../utils/mergeContent'

function _handleSlotFillNodes(layoutTree: Node, useNode: Node) {
  // Get slot and fill Nodes
  const slotNodes = getNodes('slot', layoutTree)
  const fillNodes = getNodes('fill', useNode.content)

  // loop over slot nodes and place them inside fill nodes
  for (const slotName of Object.keys(slotNodes)) {
    const fillNode = fillNodes[slotName]

    // Check if a fill node exists with the defined name from the slot
    if (!fillNode) {
      continue
    }

    // Content that needs to placed inside the fill slot
    const contentNode = slotNodes[slotName]

    // Hide Slot tag
    slotNodes[slotName].tag = false

    // Insert the slot content into the fill content
    contentNode.content = mergeContent(
      fillNode.content,
      contentNode.content,
      getFillType(fillNode)
    )

    // Remove Fill nodes
    delete fillNodes[slotName]
  }

  return layoutTree
}

export default _handleSlotFillNodes
