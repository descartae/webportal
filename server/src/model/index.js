import createTypeOfWasteModel from './typeOfWaste'
import createCenterModel from './center'

export const createModels =
  (collections) => ({
    Centers: createCenterModel(collections),
    TypesOfWaste: createTypeOfWasteModel(collections)
  })
