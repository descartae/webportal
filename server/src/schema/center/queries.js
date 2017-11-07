export const centers =
  (obj, args, { models: { Centers: { centers } } }, info) =>
    centers()

export const center =
  (obj, { _id }, { models: { Centers: { center } } }, info) =>
    center(_id)
