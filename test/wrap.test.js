"strict mode";

import util from 'util';
import chai from 'chai';
import sinon from 'sinon';

const { assert } = chai;

import wrap from '../src/wrap.js';

async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

describe('wrap()', function () {
    it('should read through and not trigger', async function () {

        const data = {
            x: 0
        };

        const cb = sinon.fake();

        const wrapped = wrap(data, cb);
        assert.isTrue(util.types.isProxy(wrapped));
        assert.strictEqual(wrapped.x, 0);
        await sleep(10);
        assert.isFalse(cb.called);
        assert.strictEqual(data.x, 0);
    });

    it('should write through and trigger', async function () {

        const data = {
            x: 0
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.x = 1;
        await p;
        assert.isTrue(cb.calledOnce);
        assert.strictEqual(data.x, 1);
        assert.strictEqual(wrapped.x, 1);
    });

    it('should write through to sub-objects and trigger', async function () {

        const data = {
            sub: {
                x: 0
            }
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.sub.x = 1;
        await p;
        assert.isTrue(cb.calledOnce);
        assert.strictEqual(data.sub.x, 1);
        assert.strictEqual(wrapped.sub.x, 1);
    });

    it('should overwrite arrays and trigger', async function () {

        const data = {
            sub: {
                x: [0]
            }
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.sub.x = [1];
        await p;
        assert.isTrue(cb.calledOnce);
        assert.strictEqual(data.sub.x[0], 1);
        assert.strictEqual(wrapped.sub.x[0], 1);
    });

    it('should write through to arrays and trigger', async function () {

        const data = {
            sub: {
                x: [0]
            }
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.sub.x[0] = 1;
        await p;
        assert.isTrue(cb.calledOnce);
        assert.strictEqual(data.sub.x[0], 1);
        assert.strictEqual(wrapped.sub.x[0], 1);
    });

    it('should append to arrays and trigger', async function () {

        const data = {
            sub: {
                x: [0]
            }
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.sub.x[1] = 1;
        await p;
        assert.isTrue(cb.calledOnce);
        assert.strictEqual(data.sub.x[1], 1);
        assert.strictEqual(wrapped.sub.x[1], 1);
    });

    it('should handle array push() and trigger', async function () {

        const data = {
            sub: {
                x: [0]
            }
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.sub.x.push(1);
        await p;
        assert.isTrue(cb.calledOnce);
        assert.strictEqual(data.sub.x[1], 1);
        assert.strictEqual(wrapped.sub.x[1], 1);
    });

    it('should handle array pop() and trigger', async function () {

        const data = {
            sub: {
                x: [0, 1]
            }
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.sub.x.pop();
        await p;
        assert.isTrue(cb.calledOnce);
        assert.strictEqual(data.sub.x.length, 1);
        assert.strictEqual(wrapped.sub.x.length, 1);
    });

    it('should handle array fill() and trigger', async function () {

        const data = {
            sub: {
                x: [0, 1, 2]
            }
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.sub.x.fill(3, 2, 3);
        await p;
        assert.isTrue(cb.calledOnce);
        assert.deepEqual(data.sub.x, [0, 1, 3]);
        assert.deepEqual(wrapped.sub.x, [0, 1, 3]);
    });

    it('should handle array reverse() and trigger', async function () {

        const data = {
            sub: {
                x: [0, 1, 2]
            }
        };

        let cb;
        const p = new Promise(resolve => cb = sinon.spy(resolve));

        const wrapped = wrap(data, cb);
        wrapped.sub.x.reverse();
        await p;
        assert.isTrue(cb.calledOnce);
        assert.deepEqual(data.sub.x, [2, 1, 0]);
        assert.deepEqual(wrapped.sub.x, [2, 1, 0]);
    });
});
