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
          iosSmallURL: 'https://s3-sa-east-1.amazonaws.com/descartae/typesOfWaste/iossmallalluminium.png',
          iosMediumURL: 'http://example.com/aluminium.png',
          iosLargeURL: 'https://s3-sa-east-1.amazonaws.com/descartae/typesOfWaste/ioslargealluminium.png',
          androidSmallURL: 'http://example.com/aluminium.png',
          androidMediumURL: 'http://example.com/aluminium.png',
          androidLargeURL: 'http://example.com/aluminium.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Vidro',
        description: 'Pedaços de vidro ou itens compostos de vidro',
        icons: {
          iosSmallURL: 'https://s3-sa-east-1.amazonaws.com/descartae/typesOfWaste/iossmallglass.png',
          iosMediumURL: 'http://example.com/glass.png',
          iosLargeURL: 'https://s3-sa-east-1.amazonaws.com/descartae/typesOfWaste/ioslargeglass.png',
          androidSmallURL: 'http://example.com/glass.png',
          androidMediumURL: 'http://example.com/glass.png',
          androidLargeURL: 'http://example.com/glass.png'
        },
        enabled: true
      },
      {
        _id: new ObjectId(),
        name: 'Papel',
        description: 'Descarte de folhas e itens feitos inteiramente de papel',
        icons: {
          iosSmallURL: 'https://s3-sa-east-1.amazonaws.com/descartae/typesOfWaste/iossmallpaper.png',
          iosMediumURL: 'http://example.com/paper.png',
          iosLargeURL: 'https://s3-sa-east-1.amazonaws.com/descartae/typesOfWaste/ioslargepaper.png',
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

    const facilities = [{
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 1',
      location: {
        address: 'Av. Exemplo 1',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.985046,
          longitude: -51.1099435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
        typesOfWaste[1]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 2',
      location: {
        address: 'Av. Exemplo 2',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.984746,
          longitude: -51.110243499999996
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
        typesOfWaste[1]._id,
        typesOfWaste[2]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 3',
      location: {
        address: 'Av. Exemplo 3',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.984446,
          longitude: -51.1105435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 4',
      location: {
        address: 'Av. Exemplo 4',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.984146,
          longitude: -51.110843499999994
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
        typesOfWaste[1]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'THURSDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 5',
      location: {
        address: 'Av. Exemplo 5',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.983846,
          longitude: -51.1111435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
        typesOfWaste[1]._id,
        typesOfWaste[2]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'THURSDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'FRIDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 6',
      location: {
        address: 'Av. Exemplo 6',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.983546,
          longitude: -51.1114435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'THURSDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'FRIDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'SATURDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 7',
      location: {
        address: 'Av. Exemplo 7',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.983246,
          longitude: -51.111743499999996
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
        typesOfWaste[1]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 8',
      location: {
        address: 'Av. Exemplo 8',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.982946,
          longitude: -51.1120435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
        typesOfWaste[1]._id,
        typesOfWaste[2]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 9',
      location: {
        address: 'Av. Exemplo 9',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.982646,
          longitude: -51.112343499999994
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    },
    {
      _id: new ObjectId(),
      createdBy: user._id,
      name: 'Local Exemplo 10',
      location: {
        address: 'Av. Exemplo 10',
        municipality: 'Porto Alegre',
        state: 'RS',
        zip: '91100-000',
        coordinates: {
          latitude: -29.982346,
          longitude: -51.1126435
        }
      },
      telephone: '+55 (51) 3000-0000',
      typesOfWaste: [
        typesOfWaste[0]._id,
        typesOfWaste[1]._id
      ],
      openHours: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'MONDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'TUESDAY',
          startTime: 12,
          endTime: 18
        }, {
          dayOfWeek: 'WEDNESDAY',
          startTime: 12,
          endTime: 18
        }
      ],
      enabled: true
    }]

    const feedbacks = [
      {
        _id: new ObjectId(),
        resolved: false,
        contents: 'Feedback Exemplo 1'
      },
      {
        _id: new ObjectId(),
        resolved: false,
        facility: facilities[0]._id,
        contents: 'Feedback Exemplo 2'
      },
      {
        _id: new ObjectId(),
        resolved: true,
        contents: 'Feedback Exemplo 3'
      }
    ]

    await Users.insert(user)
    await TypesOfWaste.insert(typesOfWaste)
    await Facilities.insert(facilities)
    await Feedbacks.insert(feedbacks)
  }
}
