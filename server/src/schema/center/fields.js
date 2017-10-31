export const createdBy = (obj, args, { dataLoaders: { Users } }, info) => {
  return Users.load(obj.createdBy)
}
