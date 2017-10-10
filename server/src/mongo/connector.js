import { MongoClient } from 'mongodb'

export default async (mongoUrl) => {
  const db = await MongoClient.connect(mongoUrl)

  return {
    Users: db.collection('users'),
    Centers: db.collection('centers')
  }
}
