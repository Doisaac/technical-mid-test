import type { User } from '../types'

interface Props {
  users: User[]
}

export const UserList = ({ users }: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Last name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id.value}>
            <td>
              <img src={user.picture.thumbnail} alt="" />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
