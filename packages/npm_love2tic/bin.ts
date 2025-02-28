#!/usr/bin/env node

import * as fs from 'fs';
import build from './build.ts'

function copyFileSync(inputFile: string, outputFile: string) {
  try {
    const data = fs.readFileSync(inputFile, 'utf-8');
    fs.writeFileSync(outputFile, build(data));
    console.log(`File copied from ${inputFile} to ${outputFile}`);
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (inputFile && outputFile) {
  copyFileSync(inputFile, outputFile);
} else {
  console.error('love2tic [input_game.lua] [output_game.tic]');
}
