import { Node } from 'posthtml'

export interface IExtendedNode extends Node {
  messages: Array<any>
}
