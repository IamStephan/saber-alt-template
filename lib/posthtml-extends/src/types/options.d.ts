export interface IOptions {
  mode: 'development' | 'production'

  /**
   * {[tag]: [path_alias]}
   */
  useTags: Record<
    string,
    {
      path: string
      default?: string
    }
  >
}
