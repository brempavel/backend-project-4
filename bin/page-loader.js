import { Command } from 'commander';
import loadPage from '../src/index.js';

const program = new Command();
program
  .name('page-loader')
  .description('')
  .arguments('')
  .version('')
  .option('')
  .action(() => {});
  
program.parse();
