import { test, expect, beforeEach } from '@jest/globals';
import { fileURLToPath } from 'url';
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import nock from 'nock';
import loadPage from '../src/index.js';

nock.disableNetConnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (name) => path.join(__dirname, '..', '__fixtures__', name);

let tmpDirPath;
beforeEach(async () => {
  tmpDirPath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

test('download page', async () => {
  const expectedData = await fs.readFile(getPath('expected.html'), 'utf-8');

  nock('https://hexlet.io')
    .get('/courses')
    .reply(200, expectedData);

  const filepath = await loadPage('https://hexlet.io/courses', tmpDirPath);
  const expectedFilepath = path.join(tmpDirPath, 'hexlet-io-courses.html');
  expect(filepath).toBe(expectedFilepath);

  const data = await fs.readFile(filepath, 'utf-8');
  expect(data).toBe(expectedData);
});

test('wrong url', async () => {
  nock('https://hex.let.io')
    .get('/courses')
    .reply(404, 'Not found');

  await expect(loadPage('https://hex.let.io/courses', tmpDirPath)).rejects.toThrow();
});
