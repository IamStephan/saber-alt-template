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

const PostHTMLExtends =
  (options: IOptions) => (tree: Node, messages: Array<any>) => {
    const mergedOptions = merge(DefaultOptions, options)
    return _handleUseTags(tree, mergedOptions, messages)
  }

// TODO: correct relative imports first before inserting into the main AST
export default PostHTMLExtends
