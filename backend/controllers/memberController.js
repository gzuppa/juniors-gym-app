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

const getMember = async (req, res) => {}

const editMember = async (req, res) => {}

const deleteMember = async (req, res) => {}

const addMember = async (req, res) => {}

export { addMember, deleteMember, editMember, getMember, getMembers, newMember }
