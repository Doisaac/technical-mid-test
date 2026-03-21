import { useEffect, useMemo, useRef, useState } from 'react'

import type { User } from './types'
import { UserList } from './components/UserList'

import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null)

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

  const filteredUsers = useMemo(() => {
    return filteredCountry != null && filteredCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLocaleLowerCase()
            .includes(filteredCountry.toLowerCase())
        })
      : users
  }, [filteredCountry, users])

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? filteredUsers.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country),
        )
      : filteredUsers
  }, [filteredUsers, sortByCountry])

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
        <input
          placeholder="Filter by country"
          onChange={(e) => {
            setFilteredCountry(e.target.value)
          }}
        />
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
