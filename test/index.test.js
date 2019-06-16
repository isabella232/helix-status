/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env mocha */

'use strict';

const assert = require('assert');
const { AssertionError } = require('assert');
const index = require('../src/index.js').main;

describe('Index Tests', () => {
  it('index function returns function for function', async () => {
    const wrapped = await index(() => 'foo');
    assert.deepEqual(typeof wrapped, 'function');
    assert.deepEqual(wrapped(), 'foo');
    const result = await wrapped({ __ow_method: 'get' });
    assert.equal(result.statusCode, 200);
  });

  it('index function returns status code for objects', async () => {
    const result = await index({});
    assert.deepEqual(result.statusCode, 200);
  });

  it('index function throws if passed invalid arguments', async () => {
    try {
      await index();
      assert.fail('this should never happen');
    } catch (e) {
      if (e instanceof AssertionError) {
        throw e;
      }
      assert.equal(e.message, 'Invalid Arguments: expected function or object');
    }
  });
});
