import type { UserResponse } from '../types'

export const fetchUsers = async ({ pageParam = 1 }: { pageParam: number }) => {
  return await fetch(
    `https://randomuser.me/api/?results=10&seed=doisaac&page=${pageParam}`,
  )
    .then((response) => {
      if (!response.ok) throw new Error('error forzado')
      return response.json()
    })
    .then((data: UserResponse) => {
      const currentPage = Number(data.info.page)
      const nextCursor = currentPage > 10 ? undefined : currentPage + 1

      return { users: data.results, nextCursor }
    })
}
