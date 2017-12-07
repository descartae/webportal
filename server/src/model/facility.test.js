/* eslint-env jest */
import createModel from './facility'

describe('Facility querying', () => {
  describe('singular query', () => {
    it('filters using the given id', async () => {
      const context = {
        Facilities: {
          async findOne ({ _id }) {
            return _id === 'id'
          }
        }
      }

      const model = createModel(context)
      const result = await model.facility('id')

      expect(result).toEqual(true)
    })
  })

  describe('plural query', () => {
    it('returns all items', async () => {
      const context = {
        Facilities: {
          find: () => ({
            limit: () => ({
              toArray: async () => [
                { _id: 'Example 1' },
                { _id: 'Example 2' }
              ]
            })
          })
        }
      }

      const args = {
        cursor: {
          quantity: 10
        }
      }

      const model = createModel(context)
      const result = await model.facilities(args)

      expect(result.items).toEqual([{ _id: 'Example 1' }, { _id: 'Example 2' }])
    })

    it('filters out disabled facilities', async () => {
      const context = {
        Facilities: {
          find: (args) => ({
            limit: () => ({
              toArray: async () => [
                {
                  _id: 'Example 1 ',
                  passed: args.enabled === true
                }
              ]
            })
          })
        }
      }

      const args = {
        cursor: {
          quantity: 10
        }
      }

      const model = createModel(context)
      const result = await model.facilities(args)

      expect(result.items).toEqual([{'_id': 'Example 1 ', 'passed': true}])
    })
  })
})

describe('Facility operations', () => {
  describe('facility creation', () => {
    it('successfully creates a well formed facility', async () => {
      const spy = {
        called: false,
        result: null
      }

      const args = {
        name: 'Example',
        location: {
          address: 'Av. Example'
        },
        typesOfWaste: ['000000000000000000000000']
      }

      const context = {
        Facilities: {
          insert: async (args) => {
            spy.called = true
            spy.result = args

            return { ops: [args] }
          }
        }
      }

      const model = createModel(context)

      await model.addFacility(args)

      expect(spy.called).toEqual(true)
      expect(spy.result.enabled).toEqual(true)
      expect(spy.result.name).toEqual('Example')
      expect(spy.result.location.address).toEqual('Av. Example')
    })

    it('ensures openHours is at least an empty list', async () => {
      const spy = {
        called: false,
        result: null
      }

      const args = {
        name: 'Example',
        location: {
          address: 'Av. Example'
        },
        typesOfWaste: ['000000000000000000000000']
        // openHours as undefined
      }

      const context = {
        Facilities: {
          insert: async (args) => {
            spy.called = true
            spy.result = args

            return { ops: [args] }
          }
        }
      }

      const model = createModel(context)

      await model.addFacility(args)

      expect(spy.called).toEqual(true)
      expect(spy.result.openHours).toEqual([])
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
        Facilities: {
          insert: async (args) => {
            spy.called = true
            spy.result = args

            return { ops: [args] }
          }
        }
      }

      const model = createModel(context)
      const operation = model.addFacility(args)
      const expectedError = new Error('Received empty value for required field: location.address')

      expect(operation).rejects.toEqual(expectedError)
    })
  })

  describe('facility update', () => {
    it('successfully updates a facility with the new data', async () => {
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
        Facilities: {
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

      await model.updateFacility(args)

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
        Facilities: {
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

      await model.updateFacility(args)

      expect(spy.called).toEqual(true)
      expect(spy.filters.enabled).toEqual(true)
      expect(spy.filters._id).toEqual('example')
      expect(spy.updates.$set).toEqual({})
    })
  })

  describe('facility disabling', () => {
    it('successfully disables an active facility', async () => {
      const spy = {
        called: false,
        filters: null,
        updates: null
      }

      const args = {
        _id: 'example'
      }

      const context = {
        Facilities: {
          updateOne: async (filters, updates) => {
            spy.called = true
            spy.filters = filters
            spy.updates = updates

            return { value: { _id: 'example' } }
          }
        }
      }

      const model = createModel(context)

      await model.disableFacility(args)

      expect(spy.called).toEqual(true)
      expect(spy.filters._id).toEqual('example')
      expect(spy.updates.$set).toEqual({ enabled: false })
    })
  })
})
