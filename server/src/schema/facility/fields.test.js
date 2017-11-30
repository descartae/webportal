/* eslint-env jest */
import { typesOfWaste } from './fields'

describe('Facility field resolvers', () => {
  describe('typesOfWaste resolver', () => {
    const context = {
      models: {
        TypesOfWaste: {
          typeOfWaste (id) {
            return id === 'typeOfWaste'
          }
        }
      }
    }

    it('does not fail on null relationship', async () => {
      const obj = {
        _id: 'facility'
      }

      const result = await typesOfWaste(obj, null, context, null)

      expect(result).toEqual([])
    })

    it('does not fail on empty list', async () => {
      const obj = {
        _id: 'facility',
        typesOfWaste: []
      }

      const result = await typesOfWaste(obj, null, context, null)

      expect(result).toEqual([])
    })

    it('resolves the references successfully', async () => {
      const obj = {
        _id: 'facility',
        typesOfWaste: ['typeOfWaste']
      }

      const result = await typesOfWaste(obj, null, context, null)

      expect(result).toEqual([true])
    })
  })
})
