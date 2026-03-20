import { useEffect, useState } from 'react'
import type { User } from './types'
import { UserList } from './components/UserList'

import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <h1>Technical Test</h1>
      <UserList users={users} />
    </>
  )
}

export default App
