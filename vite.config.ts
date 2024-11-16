import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-modal'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://31.128.41.30:8098',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', 'http://31.128.41.30:8098')
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*'
            proxyRes.headers['Access-Control-Allow-Methods'] =
              'GET,PUT,POST,DELETE,OPTIONS'
            proxyRes.headers['Access-Control-Allow-Headers'] =
              'Content-Type, Authorization'
          })
          // secure: false,
          // rewrite: (path) => path.replace(/^\/clubs/, ''),
        },
      },
      '/geocoder': {
        target: 'http://62.113.111.95:2322',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', 'http://62.113.111.95:2322')
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*'
            proxyRes.headers['Access-Control-Allow-Methods'] =
              'GET,PUT,POST,DELETE,OPTIONS'
            proxyRes.headers['Access-Control-Allow-Headers'] =
              'Content-Type, Authorization'
          })
          // secure: false,
          // rewrite: (path) => path.replace(/^\/clubs/, ''),
        },
      },
    },
  },

  build: {
    sourcemap: true, // Включение карт кода в режиме сборки
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      // "@components": path.resolve(__dirname, "./src/components"),
    },
  },
})

// function resolveAlias(arg0: { '@': string; }): import("vite").PluginOption {
//   throw new Error('Function not implemented.');
// }
