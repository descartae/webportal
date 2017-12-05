export const addFeedback =
  (obj, { input }, { models: { Feedbacks: { addFeedback } } }, info) =>
    addFeedback(input)

export const resolveFeedback =
  (obj, { input }, { models: { Feedbacks: { resolveFeedback } } }, info) =>
    resolveFeedback(input)
