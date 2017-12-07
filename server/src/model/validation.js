export const assertNotEmpty = (target, name, message = null) => {
  if (target == null) throw new Error(message || `Received empty value for required field: ${name}`)
}

export const assertAny = (target, name, message = null) => {
  if (target == null || target.length < 1) throw new Error(message || `At least one entry is required for list: ${name}`)
}