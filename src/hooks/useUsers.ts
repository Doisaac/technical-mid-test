import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import type { User } from '../types'
import { useMemo } from 'react'

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      initialPageParam: 1,
      maxPages: 10,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

  const users: User[] = useMemo(() => {
    return data?.pages?.flatMap((page) => page.users) ?? []
  }, [data])

  return {
    isLoading,
    isError,
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    users,
  }
}
