import Member from '../models/Members.js'
import Training from '../models/Training.js'

const getMembers = async (req, res) => {
  const members = await Member.find().where('principalTrainer').equals(req.user)

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

  if (!member) {
    const error = new Error('No encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no valida')
    return res.status(404).json({ msg: error.message })
  }

  const trainings = await Training.find().where('member').equals(member._id)
  res.json({ member, trainings })
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

const addSecondaryTrainer = async (req, res) => {}

const deleteSecondaryTrainer = async (req, res) => {}

export {
  addSecondaryTrainer,
  deleteMembers,
  deleteSecondaryTrainer,
  editMember,
  getMember,
  getMembers,
  newMember,
}
