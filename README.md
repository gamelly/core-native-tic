# core-native-tic
create your own game-engine with just lua for tic80.

## How to Use

### Download CLI tool

```
wget -O tic_cli.lua https://cdn.jsdelivr.net/gh/gamelly/core-native-tic/tools/build.lua
```

### Create/Download Engine

You can also create one following the specification.

 * **love** <https://cdn.jsdelivr.net/npm/@gamely/love-engine><br/>reimplementation by gamely `~10KB` (WIP)
 * **gly engine** <https://cdn.jsdelivr.net/npm/@gamely/gly-engine><br/>fullset of gly engine `~60KB`
 * **gly engine lite** <https://cdn.jsdelivr.net/npm/@gamely/gly-engine-lite><br/>speed version gly engine `~40KB`
 * **gly engine micro** <https://cdn.jsdelivr.net/npm/@gamely/gly-engine-micro><br/>smallest version gly engine `~20KB`

```
wget -O engine.lua https://cdn.jsdelivr.net/npm/@gamely/gly-engine@0.0.20
```

### Write a simple game

```lua
local function init(std, game)
    game.player = {
        x = 60,
        y = 60,
        size = 30
    }
end

local function loop(std, game)
    game.player.x = game.player.x + std.key.axis.x
    game.player.y = game.player.y + std.key.axis.y
end

local function draw(std, game)
    std.draw.clear(std.color.lightgray)
    std.draw.color(std.color.skyblue)
    std.draw.rect(0, game.player.x, game.player.y, game.player.size, game.player.size)
end

return {
    meta = {
        title = 'TIC80 example',
        author = 'RodrigoDornelles',
        version = '1.0.0',
        description = 'an game written in gly engine for tic80'
    },
    callbacks = {
        init = init,
        loop = loop,
        draw = draw
    }
}
```

### Build the cartbridge

```
lua tic_cli.lua engine.lua game.lua pong.tic
```
