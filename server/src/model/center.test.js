/* eslint-env jest */
import createModel from './center'

describe('center querying', () => {
  describe('singular query', () => {
    it('filters using the given id', async () => {
      const context = {
        Centers: {
          async findOne ({ _id }) {
            return _id === 'id'
          }
        }
      }

      const model = createModel(context)
      const result = await model.center('id')

      expect(result).toEqual(true)
    })
  })

  describe('plural query', () => {
    it('returns all items', async () => {
      const context = {
        Centers: {
          find: () => ({
            toArray: async () => [1, 2, 3]
          })
        }
      }

      const model = createModel(context)
      const result = await model.centers()

      expect(result).toEqual([1, 2, 3])
    })

    it('filters out disabled centers', async () => {
      const context = {
        Centers: {
          find: (args) => ({
            toArray: async () => args.enabled === true
          })
        }
      }

      const model = createModel(context)
      const result = await model.centers()

      expect(result).toEqual(true)
    })
  })
})

describe('center operations', () => {
  describe('center creation', () => {
    it('successfully creates a well formed center', async () => {
      const spy = {
        called: false,
        result: null
      }

      const args = {
        name: 'Example',
        location: {
          address: 'Av. Example'
        }
      }

      const context = {
        Centers: {
          insert: async (args) => {
            spy.called = true
            spy.result = args

            return { ops: [args] }
          }
        }
      }

      const model = createModel(context)

      await model.addCenter(args)

      expect(spy.called).toEqual(true)
      expect(spy.result.enabled).toEqual(true)
      expect(spy.result.name).toEqual('Example')
      expect(spy.result.location.address).toEqual('Av. Example')
    })

    it('fails if a required field is missing', async () => {
      const spy = {
        called: false,
        result: null
      }

      const args = {
        name: 'Example'
      }

      const context = {
        Centers: {
          insert: async (args) => {
            spy.called = true
            spy.result = args

            return { ops: [args] }
          }
        }
      }

      const model = createModel(context)
      const operation = model.addCenter(args)
      const expectedError = new Error('Received empty value for required field: location.address')

      expect(operation).rejects.toEqual(expectedError)
    })
  })

  describe('center update', () => {
    it('successfully updates a center with the new data', async () => {
      const spy = {
        called: false,
        filters: null,
        updates: null,
        options: null
      }

      const args = {
        _id: 'example',
        patch: {
          name: 'New Name'
        }
      }

      const context = {
        Centers: {
          findOneAndUpdate: async (filters, updates, options) => {
            spy.called = true
            spy.filters = filters
            spy.updates = updates
            spy.options = options

            return { value: { _id: 'example' } }
          }
        }
      }

      const model = createModel(context)

      await model.updateCenter(args)

      expect(spy.called).toEqual(true)
      expect(spy.filters.enabled).toEqual(true)
      expect(spy.filters._id).toEqual('example')
      expect(spy.updates.$set.name).toEqual('New Name')
      expect(spy.options.returnOriginal).toEqual(false)
    })

    it('makes no changes if no changes are given', async () => {
      const spy = {
        called: false,
        filters: null,
        updates: null,
        options: null
      }

      const args = {
        _id: 'example',
        patch: {}
      }

      const context = {
        Centers: {
          findOneAndUpdate: async (filters, updates, options) => {
            spy.called = true
            spy.filters = filters
            spy.updates = updates
            spy.options = options

            return { value: { _id: 'example' } }
          }
        }
      }

      const model = createModel(context)

      await model.updateCenter(args)

      expect(spy.called).toEqual(true)
      expect(spy.filters.enabled).toEqual(true)
      expect(spy.filters._id).toEqual('example')
      expect(spy.updates.$set).toEqual({})
    })
  })

  describe('center disabling', () => {
    it('successfully disables an active center', async () => {
      const spy = {
        called: false,
        filters: null,
        updates: null
      }

      const args = {
        _id: 'example'
      }

      const context = {
        Centers: {
          updateOne: async (filters, updates) => {
            spy.called = true
            spy.filters = filters
            spy.updates = updates

            return { value: { _id: 'example' } }
          }
        }
      }

      const model = createModel(context)

      await model.disableCenter(args)

      expect(spy.called).toEqual(true)
      expect(spy.filters._id).toEqual('example')
      expect(spy.updates.$set).toEqual({ enabled: false })
    })
  })
})
