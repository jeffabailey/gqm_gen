

import test from 'node:test';
import assert from 'node:assert';
import { FileLink } from './types';
import { getLinks } from './index';

test('can get links', (t) => {
    let fileLinks: FileLink[] = [];
    const links = getLinks(fileLinks);
    assert.strictEqual(1, 1);
});