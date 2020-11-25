import { resolve } from 'path'

export const paths = {
  // Source files
  src: resolve(process.cwd(), 'src'),

  // Production build files
  dist: resolve(process.cwd(), 'dist'),

  // Static files that get copied to build folder
  public: resolve(process.cwd(), 'public'),

  js: 'js',
  css: 'css',
  img: 'img',
  assets: 'assets'
}
