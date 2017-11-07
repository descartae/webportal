export const assertNotEmpty = (target, name, message = null) => {
  if (target == null) throw new Error(message || `Received empty value for required field: ${name}`)
}
