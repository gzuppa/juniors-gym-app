import Member from '../models/Members.js'

const getMembers = async (req, res) => {
  const members = await Member.find()
  res.json(members)
}

const newMember = async (req, res) => {
  const member = new Member(req.body)
  member.createdBy = req.user._id

  console.log(member)

  try {
    const savedMember = await member.save()
    console.log(savedMember)
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
  member.payDate = req.body.payDate || member.payDate
  member.payAmount = req.body.payAmount || member.payAmount
  member.phone = req.body.phone || member.phone
  member.age = req.body.age || member.age

  try {
    const updatedMember = await member.save()
    res.json(updatedMember)
  } catch (error) {
    console.log(error)
  }
}

const deleteMember = async (req, res) => {}

const addMember = async (req, res) => {}

export { addMember, deleteMember, editMember, getMember, getMembers, newMember }
