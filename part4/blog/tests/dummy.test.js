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

describe('favorites', () => {
    test('empty list', () => {
        const blogs = []

        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {})
    })

    test('filled list', () => {
        const blogs = [
            {
                name: "blog1",
                likes: 5
            },
            {
                name: "blogOne",
                likes: 3
            },
            {
                name: "blogOther",
                likes: 2
            },
        ]

        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[0])
    })
})

describe('most blogs', () => {
    test('empty list', () => {
        const blogs = []

        const result = listHelper.mostBlogs(blogs)
        assert.notStrictEqual(result, {author: null, blogs: null})
    })

    test('filled list', () => {
        const blogs = [
            {
                author: "bla",
                name: "blog1",
                likes: 5
            },
            {
                author: "bla",
                name: "blogOne",
                likes: 3
            },
            {
                author: "blabla",
                name: "blogOther",
                likes: 2
            },
        ]

        const result = listHelper.mostBlogs(blogs)
        assert.notStrictEqual(result, {author: "bla", blogs: 2})
    })
})

describe('most likes', () => {
    test('empty list', () => {
        const blogs = []

        const result = listHelper.mostLikes(blogs)
        assert.notStrictEqual(result, {author: null, blogs: null})
    })

    test('single blog with many likes', () => {
        const blogs = [
            {
                author: "bla",
                name: "blog1",
                likes: 5
            },
            {
                author: "bla",
                name: "blogOne",
                likes: 3
            },
            {
                author: "blabla",
                name: "blogOther",
                likes: 9
            },
        ]

        const result = listHelper.mostLikes(blogs)
        assert.notStrictEqual(result, {author: "blabla", likes: 9})
    })

    test('many blogs with likes', () => {
        const blogs = [
            {
                author: "bla",
                name: "blog1",
                likes: 5
            },
            {
                author: "bla",
                name: "blogOne",
                likes: 3
            },
            {
                author: "bla",
                name: "blogTwo",
                likes: 3
            },
            {
                author: "blabla",
                name: "blogOther",
                likes: 9
            },
        ]

        const result = listHelper.mostLikes(blogs)
        assert.notStrictEqual(result, {author: "bla", likes: 11})
    })
})