import path from 'path'
import fs from 'fs'

export const readFile = (pathFromRoot: string) => {
  const fullPath = path.resolve(process.cwd(), pathFromRoot)

  return fs.readFileSync(fullPath, 'utf8')
}
