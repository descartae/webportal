export const typesOfWaste = async ({ typesOfWaste }, args, { dataLoaders: { TypesOfWaste } }, info) => {
  return typesOfWaste && typesOfWaste.length > 0 ? typesOfWaste.map(it => TypesOfWaste.load(it)) : []
}
