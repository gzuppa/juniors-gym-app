import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  payDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  payAmount: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  age: { type: Number, min: 15, max: 80 },
  profilePhoto:
    {
      data: Buffer,
      contentType: String
    }
}, {
  timestamps: true,
})

const Member = mongoose.model('Member', memberSchema)
export default Member
