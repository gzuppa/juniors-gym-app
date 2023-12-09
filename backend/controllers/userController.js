import User from '../models/User.js'
import createId from '../helpers/createId.js'

const registerUser = async (req, res) => {
  const { email } = req.body
  const isUserExists = await User.findOne({ email: email })

  if (isUserExists) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({ msg: error.message })
  }

  try {
    const user = new User(req.body)
    user.token = createId()
    const storedUser = await user.save()
    res.json(storedUser)
  } catch (error) {
    console.error(error)
  }
}

export { registerUser }
