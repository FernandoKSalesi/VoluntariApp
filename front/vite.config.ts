import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const figmaAssetResolver = () => {
    return {
        name: 'figma-asset-resolver',
        resolveId(source: string) {
            if (source.startsWith('figma:asset/')) {
                return source;
            }
            return null;
        },
        load(id: string) {
            if (id.startsWith('figma:asset/')) {
                return `export default ""`
            }
            return null;
        }
    };
};

export default defineConfig({
  plugins: [react(), tailwindcss(), figmaAssetResolver()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
