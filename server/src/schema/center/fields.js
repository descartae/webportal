export const createdBy = ({ createdBy }, args, { dataLoaders: { Users } }, info) => {
  return Users.load(createdBy)
}

export const typesOfWaste = ({ typesOfWaste }, args, { dataLoaders: { TypesOfWaste } }, info) => {
  return typesOfWaste && typesOfWaste.length > 0 ? typesOfWaste.map(it => TypesOfWaste.load(it)) : []
}