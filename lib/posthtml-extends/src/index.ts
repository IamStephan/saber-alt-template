import { Node } from 'posthtml'
import { merge } from 'lodash'

import { IOptions } from './types/options'
import { TemplateUseTags } from './constants/useTags'
import _handleSlotFill from './tags/slotFill'
import _handleUseTags from './tags/use'

const DefaultOptions: Partial<IOptions> = {
  useTags: {
    ...TemplateUseTags,
  },
}

const PostHTMLExtends = (options: IOptions) => (tree: Node) => {
  const mergedOptions = merge(DefaultOptions, options)

  const { tree: _tree, isAltered } = _handleUseTags(tree, mergedOptions)

  return {
    tree: _tree,
    isAltered,
  }
}

// TODO: correct relative imports first before inserting into the main AST
export default PostHTMLExtends
