interface Props {
  loading: boolean
  error: boolean
  isEmpty: boolean
  children: React.ReactNode
}
export const UsersState = ({ loading, error, isEmpty, children }: Props) => {
  // Initial State
  if (isEmpty) {
    if (loading) return <strong>Loading...</strong>
    if (error) return <p>An error has occurred</p>

    return <p>There are no users</p>
  }

  // When there is data already
  return (
    <>
      {children}

      {/* loading incremental */}
      {loading && <p>Loading more...</p>}

      {/* error incremental */}
      {error && <p>Something went wrong loading more data</p>}
    </>
  )
}
