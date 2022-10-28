import { useEffect, useState } from 'react'
import usersService from '../services/users'


const Users = () => {
  const [users, setUsers] = useState([])
  console.log('users:', users)

  useEffect(() => {
    async function fetchData() {
      const response = await usersService.getAll()
      setUsers(response)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blog created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div >
  )
}


export default Users