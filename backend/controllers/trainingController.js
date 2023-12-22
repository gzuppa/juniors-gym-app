import Member from "../models/Members.js"
import Training from "../models/Training.js"

const addTraining = async (req, res) => {
  const {member} = req.body
  const existsMember = await Member.findById(member)
  if(!existsMember) {
    const error = new Error('El usuario no existe')
    return res.status(400).json({msg: error.message})
  }
  if(existsTraining.member.toString() !== req.user._id.toString()) {
    const error = new Error('Entrenamiento no corresponde a este usuario')
    return res.status(404).json({msg: error.message})
  }
  try {
    const savedTraining = await Training.create(req.body)
    res.json(savedTraining)
  } catch (error) {
    console.log(error)
  }
}

const getTraining = async (req, res) => {
  const { id } = req.params
  const training = await Training.findById(id).populate('member')
  if(!training) {
    const error = new Error('Entrenamiento no encontrado')
    return res.status(404).json({msg: error.message})
  }
  if(training.member.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida')
    return res.status(403).json({msg: error.message})
  }
  res.json(training)
}

const updateTraining = async (req, res) => {}

const deleteTraining = async (req, res) => {}

const changeTrainingStatus = async (req, res) => {}

export {
  addTraining,
  changeTrainingStatus,
  deleteTraining,
  getTraining,
  updateTraining
}



