export const typesOfWaste = (obj, args, { collections: { TypesOfWaste } }, info) => {
  return TypesOfWaste.find().toArray()
}
