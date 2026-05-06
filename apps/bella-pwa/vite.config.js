import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Bella — Consultora Embelleze',
        short_name: 'Bella',
        description: 'Converse com a Bella, sua consultora virtual do Instituto Embelleze.',
        theme_color: '#12071f',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '32x32',
            type: 'image/x-icon'
          }
          // Os ícones PNG serão reativados assim que os arquivos forem movidos para public/
        ]

      }
    })
  ]
});
