import type { User } from '../types'

interface Props {
  deleteUser: (index: string) => void
  showColors: boolean
  users: User[]
}

export const UserList = ({ showColors, deleteUser, users }: Props) => {
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

      <tbody className={showColors ? 'table--showColors' : 'table'}>
        {users.map((user) => {
          return (
            <tr key={user.email}>
              <td>
                <img src={user.picture.thumbnail} alt="" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
