import User from '../models/User.js'
import createId from '../helpers/createId.js'
import createJWT from '../helpers/createJWT.js'

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
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ msg: error.message })
  }
  if (!user.confirmedAccount) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(403).json({ msg: error.message })
  }

  if (user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createJWT(user._id),
    })
  } else {
    const error = new Error('Password incorrecto')
    return res.status(403).json({ msg: error.message })
  }
}

const confirm = async (req, res) => {
  const { token } = req.params
  const confirmUser = await User.findOne({ token })
  if (!confirmUser) {
    const error = new Error('Token invalido')
    return res.status(403).json({ msg: error.message })
  }
  try {
    confirmUser.confirmedAccount = true
    confirmUser.token = ''
    await confirmUser.save()
    res.json({ msg: 'Usuario confirmado' })
  } catch (error) {
    console.log(error)
  }
}

export { authenticate, confirm, registerUser }
