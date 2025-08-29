module.exports = [
    {
        name: 'IIFE (gz) budget',
        path: 'dist/index.global.js',
        import: false,
        running: false,
        limit: '8 KB',
        plugins: [require('@size-limit/esbuild')]
    },
    {
        name: 'ESM entry (treeshake import)',
        path: 'dist/index.js',
        import: '{ createFingerprint }',
        limit: '6 KB',
        plugins: [require('@size-limit/esbuild')]
    }
];