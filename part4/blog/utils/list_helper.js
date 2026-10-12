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

const mostBlogs = (blogs) => {
  let verboseAuthors = [{author: null, blogs: null}]
  
  blogs.forEach(blog => {
    let selectedAuthor = verboseAuthors.find(verboseAuthor => blog.author === verboseAuthor.author)
    if (selectedAuthor) {
        selectedAuthor.blogs++
    } else {
        verboseAuthors.push({author: blog.author, blogs: 1})
    }
  })

  return verboseAuthors.reduce((mostVerboseAuthor, verboseAuthor) => 
    verboseAuthor.blogs > mostVerboseAuthor.blogs 
    ? verboseAuthor 
    : mostVerboseAuthor, verboseAuthors[0]
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}