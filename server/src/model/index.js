import createTypeOfWasteModel from './typeOfWaste'
import createFacilityModel from './facility'

export const createModels =
  (collections) => ({
    Facilities: createFacilityModel(collections),
    TypesOfWaste: createTypeOfWasteModel(collections)
  })
