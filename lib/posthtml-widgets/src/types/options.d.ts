export type TToken = [string, string]

export type TScopedTokens = [TToken]

export interface IOptions {
  mode: 'development' | 'production'
}
