import { assertNotEmpty } from './validation'

export default ({ Feedbacks }) => ({
  // Root queries
  async feedback (_id) {
    return Feedbacks.findOne({ _id })
  },
  async feedbacks () {
    return Feedbacks.find().toArray()
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
