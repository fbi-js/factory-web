import * as reactPlugin from 'vite-plugin-react'
import type { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  proxy: {
    '/api': {
      target: 'http://159.138.30.184:8071',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}

export default config
