import { defineConfig } from "vite"
import path from "path"
import react from '@vitejs/plugin-react'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        reporters: ['default', 'junit'],
        outputFile: {
            junit: './test-results/junit.xml',
        },
        // reporters: [
        //     'default',
        //     ['junit', { suiteName: 'UI tests' }]
        // ],
        environment: 'jsdom',
        globals: true,
        setupFiles: 'tests/setup.js',
    },

})