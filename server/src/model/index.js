import createFacilityModel from './facility'
import createFeedbackModel from './feedback'
import createTypeOfWasteModel from './typeOfWaste'

export const createModels =
  (collections) => ({
    Facilities: createFacilityModel(collections),
    Feedbacks: createFeedbackModel(collections),
    TypesOfWaste: createTypeOfWasteModel(collections)
  })
