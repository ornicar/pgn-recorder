Fetches and stores PGN from a URL every second.

Install
-------

```
npm i
```

Record a broadcast
------------------

```
node record.js <url> <output-dir> <freq in seconds>`
```

Output:

```
Recording http://54.194.223.217/gctparis2017/03/games.pgn to dest every 2 seconds
+ dest/2017-06-22_11:11:17.pgn games:5 md5:f8109913d32c7be804ab5b700b155834 size:14045
+ dest/2017-06-22_11:11:19.pgn games:5 md5:6d9e3d77cefb21245870819308dd8ff2 size:14122
[...]
```

Replay a broadcast
------------------

```
node replay.js <port> <dir>
```
