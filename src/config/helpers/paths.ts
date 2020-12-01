import { resolve } from 'path'

const cwd = process.cwd()
export const paths = {
  cwd,
  // Source files
  src: resolve(cwd, 'src'),

  // Production build files
  dist: resolve(cwd, 'dist'),

  // Static files that get copied to build folder
  public: resolve(cwd, 'public'),

  js: 'js',
  css: 'css',
  img: 'img',
  assets: 'assets'
}
