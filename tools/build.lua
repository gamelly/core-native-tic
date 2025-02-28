-- Creates a .tic cartridge manually with CODE and DEFAULT chunks
local function writeChunk(file, bank, chunkType, data)
    local size = #data
    local header = string.char(
        (bank << 5) | chunkType,  -- Byte 0: Bank + Type
        size % 256,               -- Byte 1: Size LSB
        math.floor(size / 256),   -- Byte 2: Size MSB
        0x00                      -- Byte 3: Reserved
    )
    file:write(header)
    file:write(data)
end

if #arg ~= 3 then
    error('Usage: lua build.lua [engine.lua] [game.lua] [output.tic]', 0)
end

-- Open input and output files
local engineFile = io.open(arg[1], 'r')
local gameFile = io.open(arg[2], 'r')
local outputFile = io.open(arg[3], 'wb')
local backendFile = io.open('src/main.lua', 'r')

-- Read Lua code from files
local gameCode = gameFile:read('*a')
local engineCode = engineFile:read('*a')
local backendCode = backendFile:read('*a')

gameCode = 'tic80game = (function()' .. gameCode .. 'end)()'
engineCode = 'tic80engine = (function()' .. engineCode .. 'end)()'

-- Default chunk data (default configuration)
local defaultChunk = string.char(0x00)

-- Write chunks to the .tic file
writeChunk(outputFile, 2, 5, gameCode)
writeChunk(outputFile, 1, 5, backendCode)
writeChunk(outputFile, 0, 5, engineCode)
writeChunk(outputFile, 0, 17, defaultChunk)

outputFile:close()

print('File "'..arg[3]..'" generated!')
