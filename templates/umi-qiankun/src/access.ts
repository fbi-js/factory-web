export default function(initialState: any) {
  const { userId } = initialState

  return {
    isAdmin: userId !== 1,
  }
}
