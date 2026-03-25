import { useEffect, useMemo, useRef, useState } from 'react'

import type { SortableField, SortBy, User } from './types'
import { UserList } from './components/UserList'

import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>('none')
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === 'none' ? 'country' : 'none'
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
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
    const compareProperties: Record<SortableField, (user: User) => string> = {
      country: (user: User) => user.location.country,
      name: (user: User) => user.name.first,
      last: (user: User) => user.name.last,
    }

    return filteredUsers.toSorted((a, b) => {
      if (sorting === 'none') return 0

      const extractProperty = compareProperties[sorting]

      const compareA = extractProperty(a)
      const compareB = extractProperty(b)

      return compareA.localeCompare(compareB)
    })
  }, [filteredUsers, sorting])

  return (
    <>
      <h1>Technical Test</h1>

      <header
        style={{
          display: 'flex',
          placeContent: 'center',
          gap: '8px',
          marginBottom: '48px',
        }}
      >
        <button onClick={toggleColors}>Highlight rows</button>
        <button onClick={toggleSortByCountry}>
          {sorting === 'country' ? 'Do not sort by country' : 'Sort by country'}
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
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
