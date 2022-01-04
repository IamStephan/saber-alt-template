export type TToken = [string, string];

export type TScopedTokens = [TToken];

export interface IOptions {
  mode: "development" | "production";
  /**
   * @description Used to override the default tokens in the
   *              Global scope. DO NOT use this to add new
   *              tokens.
   */
  tokens: Record<string, string | Function>;
}
