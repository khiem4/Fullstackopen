const dummy = (blogs) => {
    return 1
}
  

const totalLikes = (blogs) => {
    return blogs.length === 0 
    ? 0
    : blogs.reduce((first,last) => first.likes + last.likes)
}

const favoriteBlog  = (blogs) => {
    return blogs.reduce((first, last) => first.likes > last.likes ? first : last)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
