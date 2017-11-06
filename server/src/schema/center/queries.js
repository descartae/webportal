import {ObjectID} from 'mongodb';

export const centers = (obj, args, { collections: { Centers } }, info) => {
  return Centers.find().toArray()
}
/*
export const center = (obj, { _id }, { dataLoaders: { Centers } }, info) => {
  return Centers.load(_id)
}
*/
// Find one center by ID
export const center = (obj, args, { collections: { Centers } }, info) => {
  return Centers.findOne({_id: ObjectID(args._id) })
}
