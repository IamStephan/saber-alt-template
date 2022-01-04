import { Expression, NodeCallback } from 'posthtml'
//@ts-expect-error
import { match } from 'posthtml/lib/api'

/**
 * PostHtml does not explicitly declare that it's exporting
 * the match api. So I'm importing the match function (expecting it to throw)
 * and then explicitly exporting it with some basic typings.
 */
export default (
  _this: any,
  exp: Expression<string, {}>,
  callback: NodeCallback
) => match.call(_this, exp, callback)
