export const facility =
  ({ facility }, args, { models: { Facilities } }, info) =>
    facility != null
      ? Facilities.facility(facility)
      : null
