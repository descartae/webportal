export const centers = (obj, args, { collections: { Centers } }, info) => {
  return Centers.find().toArray()
}

/*
export const center = (obj, args, { collections: { Centers } }, info) => {
  return Centers.findOne({_id: ObjectID(args._id)})
}
*/
