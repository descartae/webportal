export const facilities =
  (obj, { filters }, { models: { Facilities: { facilities } } }, info) =>
    facilities(filters)

export const facility =
  (obj, { _id }, { models: { Facilities: { facility } } }, info) =>
    facility(_id)
