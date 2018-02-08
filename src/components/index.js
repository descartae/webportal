import {
  FacilityListing,
  FacilityDetails,
  FacilityEditor,
  FacilityFeedbackListing,
  FacilityFeedbackDetails
} from './facility'

import {
  UserListing,
  UserDetails,
  UserEditor
} from './user'

export { default as AppMenu } from './AppMenu'
export { default as Auth } from './Auth'
export { default as ForRole } from './ForRole'

export const facility = {
  FacilityListing,
  FacilityDetails,
  FacilityEditor,
  FacilityFeedbackListing,
  FacilityFeedbackDetails
}

export const user = {
  UserListing,
  UserDetails,
  UserEditor
}
