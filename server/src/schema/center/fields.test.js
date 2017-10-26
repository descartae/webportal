/* eslint-env mocha */
import { createdBy } from './fields'

it('loads the user referenced by the center', () => {
  const obj = {
    _id: "123",
    createdBy: "user"
  }

  const context = {
    dataLoaders: {
      Users: {
        load:  (id) => id === "user"
      }
    }
  }

  expect(createdBy(obj, null, context, null)).toBe(true)
})