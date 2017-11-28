import { assertNotEmpty } from './validation'

export default ({ Facilities }) => ({
  // Root queries
  async facility (_id) {
    return Facilities.findOne({ _id })
  },
  async facilities () {
    return Facilities.find({ enabled: true }).toArray()
  },
  // Operations
  async addFacility (data) {
    assertNotEmpty(data.name, 'name')
    assertNotEmpty((data.location || {}).address, 'location.address')

    data.enabled = true

    const { ops: [facility] } = await Facilities.insert(data)

    return {
      success: true,
      facility
    }
  },
  async updateFacility ({ _id, patch }) {
    if ('name' in patch) {
      assertNotEmpty(patch.name, 'name')
    }

    if ('location' in patch && 'address' in patch.location) {
      assertNotEmpty(patch.location.address)
    }

    const { value } =
      await Facilities.findOneAndUpdate({
        _id,
        enabled: true
      }, {
        $set: patch
      }, {
        returnOriginal: false
      })

    return {
      success: true,
      facility: value
    }
  },
  async disableFacility ({ _id }) {
    await Facilities.updateOne({
      _id
    }, {
      $set: { enabled: false }
    })

    return {
      success: true
    }
  }
})
