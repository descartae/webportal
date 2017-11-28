export const center =
  ({ center }, args, { models: { Centers } }, info) =>
    center != null
      ? Centers.center(center)
      : null
