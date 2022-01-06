import path from 'path'
import { Node } from 'posthtml'

import { IOptions } from '../types/options'

export default function getNodePath(
  node: Node,
  useTagsConfig: IOptions['useTags']
) {
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
