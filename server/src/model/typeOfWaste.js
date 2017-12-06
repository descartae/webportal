import { assertNotEmpty } from './validation'
import DataLoader from 'dataloader'

export default ({ TypesOfWaste }) => {
  const batcher =
    async (ids) => TypesOfWaste.find({ _id: { $in: ids } }).toArray()

  const options = {
    cacheKeyFn: (key) => key.toString()
  }

  const dataloader = new DataLoader(batcher, options)

  return {
    // Root queries
    async typeOfWaste (_id) {
      return dataloader.load(_id)
    },
    async typesOfWaste () {
      return TypesOfWaste.find({ enabled: true }).toArray()
    },
    // Operations
    async addTypeOfWaste ({ name, description, icons }) {
      assertNotEmpty(name, 'name')
      assertNotEmpty(description, 'description')

      assertNotEmpty(icons.iosSmallURL, 'icons.iosSmallURL')
      assertNotEmpty(icons.iosMediumURL, 'icons.iosMediumURL')
      assertNotEmpty(icons.iosLargeURL, 'icons.iosLargeURL')

      assertNotEmpty(icons.androidSmallURL, 'icons.androidSmallURL')
      assertNotEmpty(icons.androidMediumURL, 'icons.androidMediumURL')
      assertNotEmpty(icons.androidLargeURL, 'icons.androidLargeURL')

      const item = {
        name,
        description,
        icons,
        enabled: true
      }

      const { ops: [result] } = await TypesOfWaste.insert(item)

      return {
        success: true,
        typeOfWaste: result
      }
    },
    async updateTypeOfWaste ({ _id, patch: { name, description, icons } }) {
      const update = {}

      if (name != null) {
        update.name = name
      }

      if (description != null) {
        update.description = description
      }

      if (icons != null) {
        for (let field in icons) {
          update[`icons.${field}`] = icons[field]
        }
      }

      const { value } =
        await TypesOfWaste.findOneAndUpdate({
          _id,
          enabled: true
        }, {
          $set: update
        }, {
          returnOriginal: false
        })

      return {
        success: true,
        typeOfWaste: value
      }
    },
    async disableTypeOfWaste ({ _id }) {
      const update = { enabled: false }

      await TypesOfWaste.updateOne({ _id }, { $set: update })

      return {
        success: true
      }
    }
  }
}
