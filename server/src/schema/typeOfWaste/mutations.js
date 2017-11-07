export const addTypeOfWaste =
  async (obj, { input }, { models: { TypesOfWaste: { addTypeOfWaste } } }, info) =>
    addTypeOfWaste(input)

export const updateTypeOfWaste =
  async (obj, { input }, { models: { TypesOfWaste: { updateTypeOfWaste } } }, info) =>
    updateTypeOfWaste(input)

export const disableTypeOfWaste =
  async (obj, { input }, { models: { TypesOfWaste: { disableTypeOfWaste } } }, info) =>
    disableTypeOfWaste(input)
