import { assertNotEmpty } from '../validation'

export const addTypeOfWaste = async (obj, args, { collections: { TypesOfWaste } }, info) => {
  const { input: { name, icon } } = args

  assertNotEmpty(name, 'name')
  assertNotEmpty(icon, 'icon')

  const item = {
    name,
    icon,
    enabled: true
  }

  const { ops: [result] } = await TypesOfWaste.insert(item)

  return {
    success: true,
    typeOfWaste: result
  }
}

export const updateTypeOfWaste = async (obj, args, { collections: { TypesOfWaste } }, info) => {
  const { input: { _id, patch: { name, icon } } } = args

  const update = {}

  if (name != null) {
    update.name = name
  }

  if (icon != null) {
    update.icon = icon
  }

  const { value } =
    await TypesOfWaste.findOneAndUpdate({
      _id,
      enabled: true
    }, {
      $set: update
    }, {
      returnOriginal: false
    })

  return {
    success: true,
    typeOfWaste: value
  }
}

export const disableTypeOfWaste = async (obj, { input: { _id } }, { collections: { TypesOfWaste } }, info) => {
  const update = { enabled: false }

  await TypesOfWaste.updateOne({ _id }, { $set: update })

  return {
    success: true
  }
}
