import { assertNotEmpty } from '../validation'

export const addTypeOfWaste = async (obj, args, { collections: { TypesOfWaste } }, info) => {
  const { data: { name, icon } } = args

  assertNotEmpty(name, 'name')
  assertNotEmpty(icon, 'icon')

  const item = {
    name,
    icon,
    enabled: true
  }

  await TypesOfWaste.insert(item)

  return true
}

export const updateTypeOfWaste = async (obj, args, { collections: { TypesOfWaste } }, info) => {
  const { data: { _id, patch: { name, icon } } } = args

  const update = {}

  if (name != null) {
    update.name = name
  }

  if (icon != null) {
    update.icon = icon
  }

  await TypesOfWaste.updateOne({ _id, enabled: true }, { $set: update })

  return true
}

export const disableTypeOfWaste = async (obj, { _id }, { collections: { TypesOfWaste } }, info) => {
  const update = { enabled: false }

  await TypesOfWaste.updateOne({ _id }, { $set: update })

  return true
}
