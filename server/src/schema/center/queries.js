export const centers = (obj, args, { collections: { Centers } }, info) => {
  return Centers.find().toArray()
}
