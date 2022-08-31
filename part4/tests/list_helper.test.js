const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: "630e0e64bc8a6f88ca11d8c0",
        author: "cassaden",
        url: "https://dev.to/cassaden/react-js-isnt-actually-a-web-framework-but-why-are-there-so-many-others-27fd",
        likes: 3,
        __v: 0
        }
    ]

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })


    test('when list has only one blog, equals the likes of that', () => {
      const result = listWithOneBlog[0].likes
      expect(result).toBe(5)        
    })

    test('when blogs list have more than one', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(8)
    })
  })        