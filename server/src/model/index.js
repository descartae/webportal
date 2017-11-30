import createTypeOfWasteModel from './typeOfWaste'
import createCenterModel from './center'
import createFeedbackModel from './feedback'

export const createModels =
  (collections) => ({
    Centers: createCenterModel(collections),
    TypesOfWaste: createTypeOfWasteModel(collections),
    Feedbacks: createFeedbackModel(collections)
  })
