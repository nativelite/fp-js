import fs from 'node:fs';
import { promisify } from 'node:util';
import zlib from 'node:zlib';


const gzip = promisify(zlib.gzip);
const brotli = promisify(zlib.brotliCompress);


async function stat(path) {
    const raw = await fs.promises.readFile(path);
    const gz = await gzip(raw, { level: 9 });
    const br = await brotli(raw, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } });
    return { path, raw: raw.length, gz: gz.length, br: br.length };
}


function fmt(n) {
    const kb = (n / 1024).toFixed(2);
    return `${n} B (${kb} KB)`;
}


(async () => {
    const files = [
        'dist/index.js',
        'dist/index.cjs',
        'dist/index.global.js'
    ].filter(f => fs.existsSync(f));


    if (files.length === 0) {
        console.error('No dist files found. Run `npm run build` first.');
        process.exit(1);
    }


    const rows = await Promise.all(files.map(stat));
    console.log('Bundle sizes for @nativelite / fp');
    console.log('='.repeat(42));
    for (const r of rows) {
        console.log(`${r.path}
            raw: ${fmt(r.raw)}
            gzip: ${fmt(r.gz)}
            brotli: ${fmt(r.br)}
        `);
    }
})();

