export const addCenter =
  (obj, { input }, { models: { Centers: { addCenter } } }, info) =>
    addCenter(input)

export const updateCenter =
  (obj, { input }, { models: { Centers: { updateCenter } } }, info) =>
    updateCenter(input)

export const disableCenter =
  (obj, { input }, { models: { Centers: { disableCenter } } }, info) =>
    disableCenter(input._id)
