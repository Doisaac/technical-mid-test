import { useEffect, useRef, useState } from 'react'
import type { User } from './types'
import { UserList } from './components/UserList'

import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch((error) => console.log(error))
  }, [])

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : users

  return (
    <>
      <h1>Technical Test</h1>

      <header
        style={{
          display: 'flex',
          placeContent: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <button onClick={toggleColors}>Highlight rows</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'Do not sort by country' : 'Sort by country'}
        </button>
        <button onClick={handleReset}>Reset Users</button>
      </header>

      <main>
        <UserList
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
