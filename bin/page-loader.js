#!/usr/bin/env node

import { Command } from 'commander';
import loadPage from '../src/index.js';

const program = new Command();
program
  .name('page-loader')
  .description('Page loader utility')
  .argument('<url>')
  .version('0.0.1')
  .option('-o --output [dir]', 'output dir', process.cwd())
  .action((url) => {
    loadPage(url, process.cwd());
  });

program.parse();
