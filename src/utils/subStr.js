export const subStr = (string, len) => {
  if (string.length > len) {
    return `${string.substring(0, len)}...`
  }
  return string
}
