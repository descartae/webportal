import { ObjectId } from 'mongodb'

export const seedDatabase = async ({ Centers, Users }) => {
  const centerCount = await Centers.count()
  const userCount = await Users.count()

  if (centerCount === 0 && userCount === 0) {
    console.log('No data found - seeding database')

    const user = {
      _id: new ObjectId(),
      name: 'Example User',
      email: 'user@example.com'
    }

    const centers = [
      {
        _id: new ObjectId(),
        createdBy: user._id,
        name: 'Global Plasticos',
        location: {
          address: 'Av. Caldeia 150',
          municipality: 'Porto Alegre',
          state: 'RS',
          zip: '91130-540'
        },
        telephone: '+55 (51) 3364-4115',
        typeofWaste: {
          aluminium: false,
          compost: false,
          cookingOil: false,
          ewaste: false,
          furniture: false,
          glass: false,
          greenWaste: false,
          hazardousWaste: false,
          paper: false,
          plastic: true
        }
      },
      {
        _id: new ObjectId(),
        createdBy: user._id,
        name: 'Fkl Recargas de Cartuchos e Toners',
        location: {
          address: 'R. Germano Hasslocher 288 s 1',
          municipality: 'Porto Alegre',
          state: 'RS',
          zip: '90160-050'
        },
        telephone: '+55 (51) 3232-9300',
        typeofWaste: {
          aluminium: false,
          compost: false,
          cookingOil: false,
          ewaste: true,
          furniture: false,
          glass: false,
          greenWaste: false,
          hazardousWaste: false,
          paper: false,
          plastic: false
        }
      }
    ]

    await Users.insert(user)
    await Centers.insert(centers)
  }
}
