export const whoami = (obj, args, context, info) => {
  const { id, email } = context.user || {}

  return id ? `${id}: ${email}` : `anonymous`
}
