import Member from '../models/Members.js'
import User from '../models/User.js'

const getMembers = async (req, res) => {
  const members = await Member.find()
    .where('principalTrainer')
    .equals(req.user)
    .select('-trainings')

  res.json(members)
}

const newMember = async (req, res) => {
  const member = new Member(req.body)
  member.principalTrainer = req.user._id

  try {
    const savedMember = await member.save()
    res.json(savedMember)
  } catch (error) {
    console.log(error)
  }
}

const getMember = async (req, res) => {
  const { id } = req.params
  const member = await Member.findById(id)
    .populate('trainings')
    .populate('secondaryTrainers', 'name email')

  if (!member) {
    const error = new Error('No encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no valida')
    return res.status(404).json({ msg: error.message })
  }

  res.json(member)
}

const editMember = async (req, res) => {
  const { id } = req.params
  const member = await Member.findById(id)

  if (!member) {
    const error = new Error('No encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no valida')
    return res.status(404).json({ msg: error.message })
  }

  member.name = req.body.name || member.name
  member.lastName = req.body.lastName || member.lastName
  member.payDate = req.body.payDate || member.payDate
  member.payAmount = req.body.payAmount || member.payAmount
  member.phone = req.body.phone || member.phone
  member.age = req.body.age || member.age
  member.memberLevel = req.body.memberLevel || member.memberLevel
  member.status = req.body.status || member.status

  try {
    const savedMember = await member.save()
    res.json(savedMember)
  } catch (error) {
    console.log(error)
  }
}

const deleteMembers = async (req, res) => {
  const { id } = req.params
  const member = await Member.findById(id)

  if (!member) {
    const error = new Error('No encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no valida')
    return res.status(404).json({ msg: error.message })
  }

  try {
    await member.deleteOne()
    res.json({ msg: 'Usuario eliminado' })
  } catch (error) {
    console.log(error)
  }
}

const searchSecondaryTrainer = async (req, res) => {
  const { name } = req.body
  const user = await User.findOne({ name }).select(
    '-confirmed -createdAt -password -token -updatedAt -__v',
  )

  if (!user) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  res.json(user)
}

const addSecondaryTrainer = async (req, res) => {
  const member = await Member.findById(req.params.id)

  if (!member) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida')
    return res.status(404).json({ msg: error.message })
  }

  const { name } = req.body
  const user = await User.findOne({ name }).select(
    '-confirmed -createdAt -password -token -updatedAt -__v',
  )

  if (!user) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (member.principalTrainer.toString() === user._id.toString()) {
    const error = new Error(
      'El entrenador principal no puede volver a agregarse',
    )
    return res.status(404).json({ msg: error.message })
  }

  if (member.secondaryTrainers.includes(user._id)) {
    const error = new Error('El entrenador ya se encuentra asignado al usuario')
    return res.status(404).json({ msg: error.message })
  }

  member.secondaryTrainers.push(user._id)
  await member.save()
  res.json({ msg: 'Entrenador agregado correctamente' })
}

const deleteSecondaryTrainer = async (req, res) => {
  const member = await Member.findById(req.params.id)

  if (!member) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida')
    return res.status(404).json({ msg: error.message })
  }

  member.secondaryTrainers.pull(req.body.id)
  await member.save()
  res.json({ msg: 'Entrenador eliminado correctamente' })
}

export {
  addSecondaryTrainer,
  deleteMembers,
  deleteSecondaryTrainer,
  editMember,
  getMember,
  getMembers,
  newMember,
  searchSecondaryTrainer,
}
