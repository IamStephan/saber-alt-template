import { Node, Plugin } from 'posthtml'
import * as yup from 'yup'

interface IOptions {
  pipelinePlugins?: Array<(tree: Node, messages: Array<any>) => Node>
  plugins?: Array<Plugin<Node>>
}

const LOOP_LIMIT = 50

const AlteredDomMessageSchema = yup.object({
  type: yup.string().oneOf(['altered_dom']).required(),
})

const PostHTMLExtends = (options: IOptions) => (tree: Node) => {
  const pipelinePlugins = options.pipelinePlugins ?? []
  const plugins = options.plugins ?? []

  let messages: Array<any> = []
  let _tree = tree
  let isComplete = false
  let loopCounter = 0

  while (!isComplete && loopCounter <= LOOP_LIMIT) {
    isComplete = true
    loopCounter++

    pipelinePlugins.forEach((plugin) => {
      _tree = plugin(_tree, messages) as any
    })

    plugins.forEach((plugin) => {
      _tree = plugin(_tree) as any
    })

    messages = messages.map((message) => {
      if (AlteredDomMessageSchema.isValidSync(message)) {
        isComplete = false
        return null
      }

      return message
    })
  }

  return _tree
}

export default PostHTMLExtends
