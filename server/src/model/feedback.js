import { ObjectId } from 'mongodb'
import { assertNotEmpty } from './validation'

export default ({ Feedbacks }) => ({
  // Root queries
  async feedback (_id) {
    return Feedbacks.findOne({ _id })
  },
  async feedbacks ({ cursor, resolved }) {
    const query = {}

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

    if (resolved != null) {
      query.resolved = resolved
    }

    const items =
      await Feedbacks
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
  async addFeedback ({ contents, center }) {
    assertNotEmpty(contents, 'contents')

    const item = {
      contents,
      center,
      resolved: false
    }

    const { ops: [feedback] } = await Feedbacks.insert(item)

    return {
      success: true,
      feedback
    }
  },
  async resolveFeedback ({ _id }) {
    const update = { resolved: true }

    const { value } =
      await Feedbacks.findOneAndUpdate({
        _id
      }, {
        $set: update
      }, {
        returnOriginal: false
      })

    return {
      success: true,
      feedback: value
    }
  }
})
