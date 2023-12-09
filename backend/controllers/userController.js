import User from "../models/User.js"

const registerUser = async (req, res) => {
  const { email } = req.body
  const isUserExists = await User.findOne({ email: email })

  if (isUserExists) {
    const error = new Error('usuario ya registrado')
    return res.status(400).json({ msg: error.message })
  }

  try {
    const user = new User(req.body)
    const storedUser = await user.save()
    res.json(storedUser)
  } catch (error){
    console.error(error)
  }
}

export {
  registerUser
}