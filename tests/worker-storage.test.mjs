import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('production content storage stays empty and rejects writes before D1/R2 setup', () => {
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    import { postRepository, mediaStore } from './lib/insights/repository.mjs';
    assert.deepEqual(await postRepository.list(), []);
    assert.equal(await postRepository.get('missing'), null);
    assert.equal(await mediaStore.get('missing.jpg'), null);
    await assert.rejects(postRepository.save({}, 0), {status:503});
    await assert.rejects(mediaStore.put('test.jpg', new Uint8Array(), 'image/jpeg'), {status:503});
  `], { encoding: 'utf8', env: {...process.env, NODE_ENV:'production'} });
  assert.equal(result.status, 0, result.stderr);
});
