export const facilities =
  (obj, args, { models: { Facilities: { facilities } } }, info) =>
    facilities()

export const facility =
  (obj, { _id }, { models: { Facilities: { facility } } }, info) =>
    facility(_id)
