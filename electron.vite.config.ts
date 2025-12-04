import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    build: {
      rollupOptions: {
        input: {
          index: 'src/main/index.ts',
          bufferWindows: 'src/main/bufferWindows.js'
        }
      }
    }
    // assetsInclude: ['**/*.exe']
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        /*'@registry': resolve('src/renderer/src/lib'),
        '@components': resolve('src/renderer/src/lib/new-york-v4'),
        '@lib': resolve('src/renderer/src/lib/new-york-v4/lib')*/
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://api-v5.eleuterios.org/api', // URL del backend
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === 'webview'
          }
        }
      })
    ]
  }
})
