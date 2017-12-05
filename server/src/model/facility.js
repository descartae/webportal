import { ObjectId } from 'mongodb'
import { assertNotEmpty } from './validation'

export default ({ Facilities }) => ({
  // Root queries
  async facility (_id) {
    return Facilities.findOne({ _id })
  },
  async facilities ({ cursor, location, hasTypesOfWaste }) {
    const query = {
      enabled: true
    }

    if (cursor.quantity < 0) {
      cursor.quantity = 1
    }

    if (cursor.quantity > 100) {
      cursor.quantity = 100
    }

    if (cursor.after != null) {
      query._id = { $gt: ObjectId(cursor.after) }
    } else if (cursor.before) {
      query._id = { $lt: ObjectId(cursor.before) }
    }

    if (hasTypesOfWaste != null && hasTypesOfWaste.length > 0) {
      query.typesOfWaste = { $in: hasTypesOfWaste }
    }

    if (location != null && location.near != null) {
      // TODO: convert lat & long into city using geocoding/local cache
      // query.city = ...
    }

    const items =
      await Facilities
        .find(query)
        .limit(cursor.quantity)
        .toArray()

    const cursors = {
      before: items.length > 0 ? items[0]._id.toString() : null,
      after: items.length > 0 ? items[items.length - 1]._id.toString() : null
    }

    return {
      cursors,
      items
    }
  },
  // Operations
  async addFacility (data) {
    assertNotEmpty(data.name, 'name')
    assertNotEmpty((data.location || {}).address, 'location.address')

    data = {
      ...data,
      openHours: data.openHours || [],
      typesOfWaste: data.typesOfWaste || [],
      enabled: true
    }

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

    if ('typesOfWaste' in patch) {
      patch.typesOfWaste = patch.typesOfWaste || []
    }

    if ('openHours' in patch) {
      patch.openHours = patch.openHours || []
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
