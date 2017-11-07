export const typesOfWaste = async ({ typesOfWaste }, args, { models: { TypesOfWaste } }, info) => {
  return typesOfWaste && typesOfWaste.length > 0 ? typesOfWaste.map(it => TypesOfWaste.typeOfWaste(it)) : []
}
