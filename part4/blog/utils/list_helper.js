var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? {}
    : _(blogs).sumBy('likes')
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : _(blogs).maxBy('likes')
}

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? {}
    : _(blogs)
      .groupBy('author')
      .map((blogData, author) => { return { author, blogs: blogData.length } })
      .maxBy('blogs')
}

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? {}
    : _(blogs)
        .groupBy('author')
        .map((blogData, author) => {return {author, likes: _.sumBy(blogData, 'likes')}})
        .maxBy('likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}