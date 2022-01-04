import { Node } from 'posthtml'
import match from '../utils/match'

type FillType = 'replace' | 'prepend' | 'append' | ''

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

function mergeContent(
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

function getFillType(node: Node) {
  let fillType = ((node.attrs && node.attrs.type) || '').toLowerCase()

  if (!['replace', 'prepend', 'append'].includes(fillType)) {
    fillType = 'replace'
  }

  return fillType as FillType
}

function getNodes(tag: 'slot' | 'fill', tree: Node | Node['content']) {
  const nodes: any = {}

  match(tree, { tag }, node => {
    if (!node.attrs || !node.attrs.name) {
      console.warn('No name was provided')
      return node
    }

    nodes[node.attrs.name] = node
    return node
  })

  return nodes
}

export default _handleSlotFillNodes
