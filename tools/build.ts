import backendCode from '../src/main.lua'  with { type: "text" }

export default function (engineCode, gameCode) {
    function writeChunk(bank: number, chunkType: number, data: string): Uint8Array {
        const size = data.length;
        const header = new Uint8Array(4);
        
        header[0] = (bank << 5) | chunkType;
        header[1] = size % 256;
        header[2] = Math.floor(size / 256);
        header[3] = 0x00;

        const dataArray = new TextEncoder().encode(data);
        const result = new Uint8Array(header.length + dataArray.length);
        result.set(header, 0);
        result.set(dataArray, header.length);

        return result;
    }

    function decorateLua(name: string, code: string) {
        return `local ${name} = function()\n${code}\nend\n`
    }

    function concatUint8Arrays(a: Uint8Array, b: Uint8Array): Uint8Array {
        const result = new Uint8Array(a.length + b.length);
        result.set(a);
        result.set(b, a.length);
        return result;
    }

    const defaultChunk = String.fromCharCode(0x00);

    let buffer = new Uint8Array(0);
    
    buffer = concatUint8Arrays(buffer, writeChunk(2, 5, decorateLua('tic80game', gameCode)));
    buffer = concatUint8Arrays(buffer, writeChunk(1, 5, decorateLua('tic80engine', engineCode)));
    buffer = concatUint8Arrays(buffer, writeChunk(0, 5, backendCode));
    buffer = concatUint8Arrays(buffer, writeChunk(0, 17, defaultChunk));

    return buffer;
}
