import Member from '../models/Members.js'
import Training from '../models/Training.js'

const addTraining = async (req, res) => {
  const { member } = req.body
  const memberExists = await Member.findById(member)

  if (!memberExists) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ msg: error.message })
  }

  if (memberExists.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('No eres el entrenador principal de este usuario')
    return res.status(404).json({ msg: error.message })
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

  if (!training) {
    const error = new Error('Entrenamiento no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (training.member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no permitida')
    return res.status(403).json({ msg: error.message })
  }

  res.json(training)
}

const updateTraining = async (req, res) => {
  const { id } = req.params
  const training = await Training.findById(id).populate('member')

  if (!training) {
    const error = new Error('Entrenamiento no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (training.member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no permitida')
    return res.status(403).json({ msg: error.message })
  }

  training.name = req.body.name || training.name
  training.description = req.body.description || training.description
  training.level = req.body.level || training.level
  training.startDate = req.body.startDate || training.startDate

  try {
    const savedTraining = await training.save()
    res.json(savedTraining)
  } catch (error) {
    console.log(error)
  }
}

const deleteTraining = async (req, res) => {
  const { id } = req.params
  const training = await Training.findById(id).populate('member')

  if (!training) {
    const error = new Error('Entrenamiento no encontrado')
    return res.status(404).json({ msg: error.message })
  }

  if (training.member.principalTrainer.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no permitida')
    return res.status(403).json({ msg: error.message })
  }

  try {
    await training.deleteOne()
    res.json({ msg: 'Entrenamiento eliminado' })
  } catch (error) {
    console.log(error)
  }
}

const changeTrainingStatus = async (req, res) => {}

export {
  addTraining,
  changeTrainingStatus,
  deleteTraining,
  getTraining,
  updateTraining,
}
