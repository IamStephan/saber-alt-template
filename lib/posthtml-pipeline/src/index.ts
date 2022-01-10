import { Node, Plugin } from 'posthtml'

interface IOptions {
  plugins?: Array<Plugin<Node>>
  legacyPlugins?: Array<Plugin<Node>>
}

const LOOP_LIMIT = 50

const PostHTMLExtends = (options: IOptions) => (tree: Node) => {
  /**
   * Plugins are declared like this:
   * plugins: [
   *    require('path-to-plugin')({ _options_ })
   * ]
   */
  const plugins = options.plugins ?? []
  const legacyPlugins = options.legacyPlugins ?? []

  let _tree = tree
  let isComplete = false
  let loopCounter = 0

  while (!isComplete && loopCounter <= LOOP_LIMIT) {
    isComplete = true
    loopCounter++

    plugins.forEach((plugin) => {
      const { tree, isAltered, messages } = plugin(_tree) as any

      _tree = tree
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        if (message.type === 'altered_dom') {
          isComplete = false
          break
        }
      }
    })

    legacyPlugins.forEach((plugin) => {
      _tree = plugin(_tree) as any
    })
  }

  return _tree
}

/**
 * NOTE:
 * ======
 * The message array that PostHTML suggests for passing info
 * the other plugins does not work. The idea gets ignored by
 * basically all plugins so they just remove the array.
 *
 * So split plugins into two categories; Pipeline-based and
 * legacy. Legacy plugins continue altering the tree as they
 * always have. Pipeline based plugins should return an object.
 * This then allows messages to be passed to other pipeline
 * plugins. The pipline should continue running until the tree
 * is solved or after the loop limit is reached
 */
export default PostHTMLExtends
