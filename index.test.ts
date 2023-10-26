

import * as Commonmark from 'commonmark';
import test from 'node:test';
import assert from 'node:assert';
import { FileLink } from './types';
import { getLinks } from './index';

// test('can get links', (t) => {
//     let fileLinks: Commonmark.Node;
//     const links = getLinks(fileLinks);
//     assert.strictEqual(1, 1);
// });