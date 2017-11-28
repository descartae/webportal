import { MongoClient } from 'mongodb'

let db

export const shutdown = () => {
  return new Promise((resolve, reject) => {
    if (db != null) {
      db.close(true, () => resolve())
    } else {
      resolve()
    }
  })
}

export const connect = async (mongoUrl) => {
  if (db == null) {
    db = await MongoClient.connect(mongoUrl)
  }

  return {
    Users: db.collection('users'),
    Facilities: db.collection('facilities'),
    TypesOfWaste: db.collection('typesOfWaste')
  }
}
