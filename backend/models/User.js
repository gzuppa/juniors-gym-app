import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmedAccount: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function(next) {
  if(this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  console.log(salt, 'salt')
  console.log(this.password, 'this.password')
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = async function(formPassword) {
  return await bcrypt.compare(formPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
