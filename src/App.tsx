import { useMemo, useState } from 'react'

import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers'
import type { SortableField, SortBy, User } from './types'

import './App.css'
import { UsersState } from './components/UsersState'

function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } =
    useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>('none')
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === 'none' ? 'country' : 'none'
    setSorting(newSortingValue)
  }

  const handleReset = async () => {
    void refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    return filteredCountry != null && filteredCountry.length > 0
      ? users.filter((user: User) => {
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

    return filteredUsers.toSorted((a: User, b: User) => {
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
        <UsersState
          loading={isLoading}
          error={isError}
          isEmpty={users.length === 0}
        >
          <UserList
            changeSorting={handleChangeSort}
            showColors={showColors}
            users={sortedUsers}
          />
        </UsersState>

        {!isLoading && !isError && hasNextPage && (
          <button onClick={() => fetchNextPage()}>Load more users</button>
        )}

        {!isLoading && !isError && !hasNextPage && (
          <p>There are no more results</p>
        )}
      </main>
    </>
  )
}

export default App
