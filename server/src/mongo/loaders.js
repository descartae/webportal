import DataLoader from 'dataloader'

const createBatcherById = 
  (collection) => 
    async (ids) => collection.find({ _id: { $in: ids } }).toArray()

export default (collections) => {
  const { Users, Centers } = collections

  return {
    Users: new DataLoader(createBatcherById(Users)),
    Centers: new DataLoader(createBatcherById(Centers))
  }
}