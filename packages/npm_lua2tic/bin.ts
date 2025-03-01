#!/usr/bin/env node

import * as fs from 'fs';
import build from '../../tools/build.ts'

function copyFileSync(engine: string, game: string, outputFile: string) {
  try {
    const game_code = fs.readFileSync(game, 'utf-8');
    const engine_code = fs.readFileSync(engine, 'utf-8');
    fs.writeFileSync(outputFile, build(engine_code, game_code));
    console.log(`File "${outputFile}" generated.`);
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

const engineFile = process.argv[2];
const gameFile = process.argv[3];
const outputFile = process.argv[4];

if (engineFile && gameFile && outputFile) {
  copyFileSync(engineFile, gameFile, outputFile);
} else {
  console.error('lua2tic [engine.lua] [game.lua] [output.tic]');
}
