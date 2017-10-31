export const centers = (obj, args, { collections: { Centers } }, info) => {
  return Centers.find().toArray()
}

export const center = (obj, { _id }, { dataLoaders: { Centers } }, info) => {
  return Centers.load(_id)
}
