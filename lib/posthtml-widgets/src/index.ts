import 'core-js'
import { Node } from 'posthtml'

import { handleWidgets } from './tags/use'
import { IOptions } from './types/options'

const PostHTMLWidgets =
  (options: IOptions) => (tree: Node, messages: Array<any>) => {
    const _tree = handleWidgets(tree)

    return _tree
  }

// This plugin depends on posthtml-tokens
export default PostHTMLWidgets
