import { Node } from 'posthtml'

export type FillType = 'replace' | 'prepend' | 'append' | ''

export default function getFillType(node: Node) {
  let fillType = ((node.attrs && node.attrs.type) || '').toLowerCase()

  if (!['replace', 'prepend', 'append'].includes(fillType)) {
    fillType = 'replace'
  }

  return fillType as FillType
}
