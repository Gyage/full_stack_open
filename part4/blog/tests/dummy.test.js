const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('empty list', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('single blog', () => {
        const blogs = [
            {likes: 5}
        ]

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 5)
    })

    test('filled list', () => {
        const blogs = [
            {likes: 5},
            {likes: 3},
            {likes: 2}
        ]

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 10)
    })
})
