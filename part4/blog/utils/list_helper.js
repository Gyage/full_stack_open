const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((mostLiked, blog) => blog.likes > mostLiked.likes ? blog : mostLiked, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}