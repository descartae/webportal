export const feedbacks =
  (obj, args, { models: { Feedbacks: { feedbacks } } }, info) =>
    feedbacks()

export const feedback =
  (obj, { _id }, { models: { Feedbacks: { feedback } } }, info) =>
    feedback(_id)
