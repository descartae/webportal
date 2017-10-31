/* eslint-env jest */
import { typesOfWaste } from './fields'

describe('Center field resolvers', () => {
  describe('typesOfWaste resolver', () => {
    const context = {
      dataLoaders: {
        TypesOfWaste: {
          load (id) {
            return id === 'typeOfWaste'
          }
        }
      }
    }

    it('does not fail on null relationship', async () => {
      const obj = {
        _id: 'center'
      }

      const result = await typesOfWaste(obj, null, context, null)

      expect(result).toEqual([])
    })

    it('does not fail on empty list', async () => {
      const obj = {
        _id: 'center',
        typesOfWaste: []
      }

      const result = await typesOfWaste(obj, null, context, null)

      expect(result).toEqual([])
    })

    it('resolves the references successfully', async () => {
      const obj = {
        _id: 'center',
        typesOfWaste: ['typeOfWaste']
      }

      const result = await typesOfWaste(obj, null, context, null)

      expect(result).toEqual([true])
    })
  })
})
