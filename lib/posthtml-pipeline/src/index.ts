import { Node, Plugin } from 'posthtml'

interface IExtendedNode extends Node {
  messages: Array<any>
}

interface IOptions {
  plugins?: Array<Plugin<Node>>
}

const LOOP_LIMIT = 50

const PostHTMLExtends = (options: IOptions) => (tree: IExtendedNode) => {
  /**
   * Plugins are declared like this:
   * plugins: [
   *    require('path-to-plugin')({ _options_ })
   * ]
   */
  const plugins = options.plugins ?? []

  let _tree = tree
  let isComplete = false
  let loopCounter = 0

  while (!isComplete && loopCounter <= LOOP_LIMIT) {
    isComplete = true
    loopCounter++

    plugins.forEach((plugin) => {
      const { tree, isAltered } = plugin(_tree) as any

      _tree = tree

      if (isAltered) {
        isComplete = false
      }
    })
  }

  console.log(loopCounter)

  return _tree
}

export default PostHTMLExtends
