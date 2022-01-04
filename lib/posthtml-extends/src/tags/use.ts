import path from 'path'
import fs from 'fs'
import { Node } from 'posthtml'
import { parser as parseToPostHtml } from 'posthtml-parser'

import _handleSlotFill from './slotFill'
import match from '../utils/match'
import { IOptions } from '../types/options'

function getNodePath(node: Node, useTagsConfig: IOptions['useTags']) {
  const _tag = node.tag as string
  const _useTagConfig = useTagsConfig[_tag]
  const pathPrefix = _useTagConfig.path
  const defaultFile = _useTagConfig?.default ?? ''

  // src
  if (!node.attrs || !node.attrs.src) {
    // This means there isn't proper definitions
    if (!defaultFile) {
      throw new Error('Insufficient data to find node content')
    }

    // Using default file specified in the config
    return path.resolve(pathPrefix, defaultFile)
  }

  const src = node.attrs.src
  // Using src provided from tag
  return path.resolve(pathPrefix, src)
}

function _handleUseNode(node: Node, options: IOptions) {
  let _node = node
  const useTags = options.useTags
  const nodeExp = Object.keys(useTags).map(tag => ({ tag }))

  match(_node, nodeExp, useNode => {
    let useNodeContentPath: string
    let useNodeContent: string

    try {
      useNodeContentPath = getNodePath(useNode, useTags)
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
    const layoutTree = _handleUseNode(
      //@ts-expect-error
      parseToPostHtml(useNodeContent),
      options
    )

    // Remove the tag from the ouput tree but keep it intact for the AST
    useNode.tag = false as any

    // Slot and fill behaviour
    useNode.content = [_handleSlotFill(layoutTree, useNode)]

    return useNode
  })

  return _node
}

export default _handleUseNode
