
const UserBlogs = ({ userBlogs }) => {
  return (
    <div>
      {userBlogs.map(b =>
        <li key={b.id}>
          {b.title}
        </li>)}
    </div>
  )
}

export default UserBlogs