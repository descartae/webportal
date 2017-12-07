export const feedbacks =
  (obj, { filters }, { models: { Feedbacks: { feedbacks } } }, info) =>
    feedbacks(filters)

export const feedback =
  (obj, { _id }, { models: { Feedbacks: { feedback } } }, info) =>
    feedback(_id)
