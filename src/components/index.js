import {
  FacilityListing,
  FacilityDetails,
  FacilityEditor
} from './facility'

import {
  UserListing,
  UserDetails,
  UserEditor
} from './user'

import {
  PorousSwitch,
  PorousRoute
} from './router'

export { default as AppMenu } from './AppMenu'
export { default as Auth } from './Auth'

export const facility = {
  FacilityListing,
  FacilityDetails,
  FacilityEditor
}

export const user = {
  UserListing,
  UserDetails,
  UserEditor
}

export const router = {
  PorousSwitch,
  PorousRoute
}