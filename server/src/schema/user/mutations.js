import jwt from 'jsonwebtoken'

export const authenticate = (obj, args, context, info) => {
  const id = 'identification'
  const { email } = args.credentials

  const payload = { id, email }

  const { JWT_SECRET } = context.configuration

  return {
    success: true,
    sessionToken: jwt.sign(payload, Buffer.from(JWT_SECRET, 'base64'))
  }
}