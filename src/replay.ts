import Koa from 'koa';
import * as fs from 'fs/promises';

const path = process.argv[2];

const files = await fs.readdir(path);
console.log(`Found ${files.length} files in ${path}`);
let fileIndex = 0;

const app = new Koa()
  .use(async ctx => {
    const file = files[fileIndex];
    if (file) {
      const buffer = await fs.readFile(`${path}/${file}`);
      const pgn = buffer.toString();
      console.log(`Serving ${fileIndex + 1}/${files.length} | ${file} | size: ${pgn.length}`);
      ctx.body = pgn;
      fileIndex++;
      if (fileIndex === files.length) {
        console.log('No more files to serve');
        app.close();
      }
    } else {
      console.log(`File not found: ${fileIndex}`);
      ctx.status = 404;
    }
  })
  .listen(6399);
