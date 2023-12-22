import Member from '../models/Members.js'
import Training from '../models/Training.js'

const getMembers = async (req, res) => {
  const members = await Member.find()
  res.json(members)
}

const newMember = async (req, res) => {
  const member = new Member(req.body)
  member.createdBy = req.user._id
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
    const error = new Error('Cliente no encontrado')
    return res.status(404).json({ msg: error.message })
  }
  res.json(member)
}

const editMember = async (req, res) => {
  const { id } = req.params
  const member = await Member.findById(id)

  if (!member) {
    const error = new Error('Cliente no encontrado')
    return res.status(404).json({ msg: error.message })
  }
  member.name = req.body.name || member.name
  member.lastName = req.body.lastName || member.lastName
  member.payDate = req.body.payDate || member.payDate
  member.ingressDate = req.body.ingressDate || member.ingressDate
  member.payAmount = req.body.payAmount || member.payAmount
  member.phone = req.body.phone || member.phone
  member.age = req.body.age || member.age
  member.status = req.body.status || member.status

  try {
    const updatedMember = await member.save()
    res.json(updatedMember)
  } catch (error) {
    console.log(error)
  }
}

const deleteMember = async (req, res) => {
  const { id } = req.params
  const member = await Member.findById(id)

  if (!member) {
    const error = new Error('Cliente no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  try {
    await member.deleteOne()
    res.json({ msg: 'Cliente eliminado' })
  } catch (error) {
    console.log(error)
  }
}

const changeStatus = async (req, res) => {
  const { id } = req.params
  const member = await Member.findById(id)

  if (!member) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  try {
    await member.deleteOne()
    res.json({ msg: 'Usuario eliminado' })
  } catch (error) {
    console.log(error)
  }
}

const getTrainings = async (req, res) => {
  const {id} = req.params
  const existsMember = await Member.findById(id) 
  if(!existsMember) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({ msg: error.message })
  }
  //Tal vez debe borrarse esta comprobacion
  const trainings = await Training.find().where('member').equals(id)
  res.json(trainings)
}

export {
  changeStatus,
  deleteMember,
  editMember,
  getMember,
  getMembers,
  getTrainings,
  newMember,
}
