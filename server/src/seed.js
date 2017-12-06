import { ObjectId } from 'mongodb'

export const seedDatabase = async ({ Facilities, Users, TypesOfWaste, Feedbacks }) => {
  const facilityCount = await Facilities.count()
  const userCount = await Users.count()
  const typesOfWasteCount = await TypesOfWaste.count()

  if (facilityCount === 0 && userCount === 0 && typesOfWasteCount === 0) {
    console.log('No data found - seeding database')

    const typesOfWaste = [
      {
        _id: new ObjectId(),
        name: 'Alumínio',
        description: 'Peças diversas feitas de alumínio',
        icons: {
          iosSmallURL: 'http://example.com/aluminium.png',
          iosMediumURL: 'http://example.com/aluminium.png',
          iosLargeURL: 'http://example.com/aluminium.png',
          androidSmallURL: 'http://example.com/aluminium.png',
          androidMediumURL: 'http://example.com/aluminium.png',
          androidLargeURL: 'http://example.com/aluminium.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Compostas',
        description: 'Compostos de lixo orgânico',
        icons: {
          iosSmallURL: 'http://example.com/compost.png',
          iosMediumURL: 'http://example.com/compost.png',
          iosLargeURL: 'http://example.com/compost.png',
          androidSmallURL: 'http://example.com/compost.png',
          androidMediumURL: 'http://example.com/compost.png',
          androidLargeURL: 'http://example.com/compost.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Óleo de Cozinha',
        description: 'Óleo saturado utilizado em alimentos',
        icons: {
          iosSmallURL: 'http://example.com/cookingOil.png',
          iosMediumURL: 'http://example.com/cookingOil.png',
          iosLargeURL: 'http://example.com/cookingOil.png',
          androidSmallURL: 'http://example.com/cookingOil.png',
          androidMediumURL: 'http://example.com/cookingOil.png',
          androidLargeURL: 'http://example.com/cookingOil.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Lixo Eletrônico',
        description: 'Aparelhos eletrônicos diversos',
        icons: {
          iosSmallURL: 'http://example.com/ewaste.png',
          iosMediumURL: 'http://example.com/ewaste.png',
          iosLargeURL: 'http://example.com/ewaste.png',
          androidSmallURL: 'http://example.com/ewaste.png',
          androidMediumURL: 'http://example.com/ewaste.png',
          androidLargeURL: 'http://example.com/ewaste.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Móveis',
        description: 'Móveis residenciais diversos',
        icons: {
          iosSmallURL: 'http://example.com/furniture.png',
          iosMediumURL: 'http://example.com/furniture.png',
          iosLargeURL: 'http://example.com/furniture.png',
          androidSmallURL: 'http://example.com/furniture.png',
          androidMediumURL: 'http://example.com/furniture.png',
          androidLargeURL: 'http://example.com/furniture.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Vidro',
        description: 'Pedaços de vidro ou itens compostos de vidro',
        icons: {
          iosSmallURL: 'http://example.com/glass.png',
          iosMediumURL: 'http://example.com/glass.png',
          iosLargeURL: 'http://example.com/glass.png',
          androidSmallURL: 'http://example.com/glass.png',
          androidMediumURL: 'http://example.com/glass.png',
          androidLargeURL: 'http://example.com/glass.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Lixo Verde',
        description: 'Descarte de grama, folhas, galhos e semelhantes',
        icons: {
          iosSmallURL: 'http://example.com/greenWaste.png',
          iosMediumURL: 'http://example.com/greenWaste.png',
          iosLargeURL: 'http://example.com/greenWaste.png',
          androidSmallURL: 'http://example.com/greenWaste.png',
          androidMediumURL: 'http://example.com/greenWaste.png',
          androidLargeURL: 'http://example.com/greenWaste.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Resíduos Perigosos',
        description: 'Itens que apresentam risco de contaminação',
        icons: {
          iosSmallURL: 'http://example.com/hazardousWaste.png',
          iosMediumURL: 'http://example.com/hazardousWaste.png',
          iosLargeURL: 'http://example.com/hazardousWaste.png',
          androidSmallURL: 'http://example.com/hazardousWaste.png',
          androidMediumURL: 'http://example.com/hazardousWaste.png',
          androidLargeURL: 'http://example.com/hazardousWaste.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Papel',
        description: 'Descarte de folhas e itens feitos inteiramente de papel',
        icons: {
          iosSmallURL: 'http://example.com/paper.png',
          iosMediumURL: 'http://example.com/paper.png',
          iosLargeURL: 'http://example.com/paper.png',
          androidSmallURL: 'http://example.com/paper.png',
          androidMediumURL: 'http://example.com/paper.png',
          androidLargeURL: 'http://example.com/paper.png'
        },
        enabled: true
      }
    ]

    const user = {
      _id: new ObjectId(),
      name: 'Example User',
      email: 'user@example.com'
    }

    const facilities = [
      {
        _id: new ObjectId(),
        createdBy: user._id,
        name: 'Global Plasticos',
        location: {
          address: 'Av. Caldeia 150',
          municipality: 'Porto Alegre',
          state: 'RS',
          zip: '91130-540',
          coordinates: {
            latitude: -29.985346,
            longitude: -51.1096435
          }
        },
        telephone: '+55 (51) 3364-4115',
        typesOfWaste: [
          typesOfWaste[0]._id,
          typesOfWaste[1]._id
        ],
        openHours: [
          {
            dayOfWeek: 'MONDAY',
            startTime: 8,
            endTime: 17
          },
          {
            dayOfWeek: 'TUESDAY',
            startTime: 8,
            endTime: 17
          },
          {
            dayOfWeek: 'WEDNESDAY',
            startTime: 8,
            endTime: 17
          },
          {
            dayOfWeek: 'THURSDAY',
            startTime: 8,
            endTime: 17
          },
          {
            dayOfWeek: 'FRIDAY',
            startTime: 8,
            endTime: 17
          }
        ],
        enabled: true
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
        typesOfWaste: [
          typesOfWaste[1]._id
        ],
        openHours: [
          {
            dayOfWeek: 'WEDNESDAY',
            startTime: 12,
            endTime: 18
          },
          {
            dayOfWeek: 'THURSDAY',
            startTime: 12,
            endTime: 18
          },
          {
            dayOfWeek: 'FRIDAY',
            startTime: 15,
            endTime: 18
          }
        ],
        enabled: true
      }
    ]

    const feedbacks = [
      {
        _id: new ObjectId(),
        resolved: false,
        contents: 'Example feedback 1'
      },
      {
        _id: new ObjectId(),
        resolved: false,
        facility: facilities[0]._id,
        contents: 'Example feedback 2'
      },
      {
        _id: new ObjectId(),
        resolved: true,
        contents: 'Example feedback 3'
      }
    ]

    await Users.insert(user)
    await TypesOfWaste.insert(typesOfWaste)
    await Facilities.insert(facilities)
    await Feedbacks.insert(feedbacks)
  }
}
