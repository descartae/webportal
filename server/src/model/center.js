import { assertNotEmpty } from './validation'

export default ({ Centers }) => ({
  // Root queries
  async center (_id) {
    return Centers.findOne({ _id })
  },
  async centers () {
    return Centers.find({ enabled: true }).toArray()
  },
  // Operations
  async addCenter (data) {
    assertNotEmpty(data.name, 'name')
    assertNotEmpty((data.location || {}).address, 'location.address')

    data.enabled = true

    const { ops: [center] } = await Centers.insert(data)

    return {
      success: true,
      center
    }
  },
  async updateCenter ({ _id, patch }) {
    if ('name' in patch) {
      assertNotEmpty(patch.name, 'name')
    }

    if ('location' in patch && 'address' in patch.location) {
      assertNotEmpty(patch.location.address)
    }

    const { value } =
      await Centers.findOneAndUpdate({
        _id,
        enabled: true
      }, {
        $set: patch
      }, {
        returnOriginal: false
      })

    return {
      success: true,
      center: value
    }
  },
  async disableCenter ({ _id }) {
    await Centers.updateOne({
      _id
    }, {
      $set: { enabled: false }
    })

    return {
      success: true
    }
  }
})
