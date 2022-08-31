const dummy = (blogs) => {
    return 1
}
  

const totalLikes = (blogs) => {
    return blogs.length === 0 
    ? 0
    : blogs.reduce((first,last) => first.likes + last.likes)
}

module.exports = {
    dummy,
    totalLikes
}
