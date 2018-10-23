const express = require('express');
const fs = require('fs-extra');

const port = parseInt(process.argv[2]);
const dir = process.argv[3];

fs.readdir(dir).then(files => {

  console.log(`Found ${files.length} files in ${dir}`);

  let fileIndex = 0;

  const app = express();

  app.get('/pgn', function (req, res) {
    const file = files[fileIndex];
    if (file) {
      fs.readFile(`${dir}/${file}`).then(buffer => {
        const pgn = buffer.toString();
        console.log(`Serving ${fileIndex + 1}/${files.length} | ${file} | size: ${pgn.length}`);
        res.send(pgn)
        fileIndex++;
      });
    }
    else {
      console.log('No more files to serve');
      res.status(404).end();
    }
  })
  app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
  })
});
