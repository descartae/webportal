import { assertNotEmpty } from './validation'

export default ({ TypesOfWaste }) => ({
  // Root queries
  async typeOfWaste (_id) {
    return TypesOfWaste.findOne({ _id })
  },
  async typesOfWaste () {
    return TypesOfWaste.find({ enabled: true }).toArray()
  },
  // Operations
  async addTypeOfWaste ({ name, icon }) {
    assertNotEmpty(name, 'name')
    assertNotEmpty(icon, 'icon')

    const item = {
      name,
      icon,
      enabled: true
    }

    const { ops: [result] } = await TypesOfWaste.insert(item)

    return {
      success: true,
      typeOfWaste: result
    }
  },
  async updateTypeOfWaste ({ _id, patch: { name, icon } }) {
    const update = {}

    if (name != null) {
      update.name = name
    }

    if (icon != null) {
      update.icon = icon
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
})
