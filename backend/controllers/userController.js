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

const authenticate = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({email})
  if(!user) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({msg: error.message})
  }
  if(!user.confirmedAccount) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(403).json({msg: error.message})
  }

  if(await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    const error = new Error('Password ')
    return res.status(403).json({msg: error.message})
  }
}

export { authenticate, registerUser }
