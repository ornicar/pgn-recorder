# HTTP endpoint recorder

## Usage

### Record a PGN source

```
pnpm record data/shenzhen http://zhibo.zhisai.net/DA/rounds/round-4/games.pgn 5
```

Hits that URL every 5 seconds and store the content to data/shenzhen only when it changes.

### Replay a PGN source

```sh
pnpm replay data/shenzhen
```

Opens an HTTP server on port 6399 and serves the files recorded in data/shenzhen.
Each hit to http://localhost:6399/ will serve the next file in the directory.
When the last file is served, the server will stop.
