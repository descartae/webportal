export default ({ Centers }) => ({
  // Root queries
  async center (_id) {
    return Centers.findOne({ _id })
  },
  async centers () {
    return Centers.find().toArray()
  },
  // Operations
  async addCenter () {
    return {
      success: true
    }
  },
  async updateCenter () {
    return {
      success: true
    }
  },
  async disableCenter () {
    return {
      success: true
    }
  }
})
