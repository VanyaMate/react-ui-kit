import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dtsPlugin from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';


export default defineConfig(({ mode }) => {
    const isDev: boolean = mode === 'development';

    return {
        plugins  : [
            react(),
            dtsPlugin({
                outDir      : 'dist',
                rollupTypes : true,
                entryRoot   : 'src',
                copyDtsFiles: false,
            }),
            cssInjectedByJsPlugin(),
        ],
        css      : {
            modules: {
                generateScopedName: isDev ? '[name]_[local]_[hash:base64:5]'
                                          : '[hash:base64:5]',
            },
        },
        resolve  : {
            alias: {
                '@components': './src/components',
                '@lib'       : './src/lib',
                '@types'     : './src/types',
                '$'          : './',
                'index'      : './src/index.ts',
            },
        },
        publicDir: 'public',
        build    : {
            lib          : {
                entry   : './src/index.ts',
                fileName: 'index',
                formats : [ 'es', 'cjs' ],
            },
            outDir       : 'dist',
            rollupOptions: {
                external: [
                    'react',
                    'react-dom',
                    'react/jsx-runtime',
                    'react/jsx-dev-runtime',
                ],
            },
        },
    };
});