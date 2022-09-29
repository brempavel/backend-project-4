import { test, expect } from '@jest/globals';
import loader from '../src/index.js';

test('initial', () => {
  expect(loader()).toBe('Hello, World!');
});
