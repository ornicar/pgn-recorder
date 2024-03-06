import Router from '@koa/router';
import Koa from 'koa';
import * as fs from 'fs';

const path = process.argv[2];
const port = 6399;

const files = await fs.promises.readdir(path);
console.log(`Found ${files.length} files in ${path}`);
let fileIndex = 0;

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, _) => {
  const file = files[fileIndex];
  if (file) {
    const buffer = await fs.promises.readFile(`${path}/${file}`);
    const pgn = buffer.toString();
    console.log(`Serving ${fileIndex + 1}/${files.length} | ${file} | size: ${pgn.length}`);
    ctx.body = pgn;
    fileIndex++;
  } else {
    console.log('No more files to serve');
    ctx.status = 404;
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(port);
