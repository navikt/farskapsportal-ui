/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const srcDir = path.resolve(__dirname, 'src');

export default defineConfig({
    plugins: [react(), svgr()],
    define: {
        'process.env.NAIS_APP_NAME': JSON.stringify(process.env.NAIS_APP_NAME),
        'process.env.NAIS_TEAM': JSON.stringify(process.env.NAIS_TEAM),
        'process.env.NAIS_APP_IMAGE': JSON.stringify(process.env.NAIS_APP_IMAGE),
    },
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            components: path.join(srcDir, 'components'),
            pages: path.join(srcDir, 'pages'),
            store: path.join(srcDir, 'store'),
            utils: path.join(srcDir, 'utils'),
            api: path.join(srcDir, 'api'),
            texts: path.join(srcDir, 'texts'),
            types: path.join(srcDir, 'types'),
            assets: path.join(srcDir, 'assets'),
            styles: path.join(srcDir, 'styles'),
            'test-utils': path.join(srcDir, 'test-utils'),
        },
    },
    build: {
        outDir: 'build',
        rollupOptions: {
            external: ['/nais.js'],
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test-setup.ts'],
    },
});
