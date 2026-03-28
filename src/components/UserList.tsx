import type { SortBy, User } from '../types'

interface Props {
  changeSorting: (sort: SortBy) => void
  deleteUser?: (index: string) => void
  showColors: boolean
  users: User[]
}

export const UserList = ({
  changeSorting,
  showColors,
  // deleteUser,
  users,
}: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Picture</th>
          <th className="pointer" onClick={() => changeSorting('name')}>
            Name
          </th>
          <th className="pointer" onClick={() => changeSorting('last')}>
            Last name
          </th>
          <th className="pointer" onClick={() => changeSorting('country')}>
            Country
          </th>
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
                <button>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
