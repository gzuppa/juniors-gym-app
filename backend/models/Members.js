import mongoose from 'mongoose'

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    payDate: {
      type: Date,
      default: Date.now(),
    },
    payAmount: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: { type: Number, min: 12, max: 80 },
    memberLevel: {
      type: String,
      enum: ['Principiante', 'Intermedio', 'Avanzado'],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pagado', 'Por pagar', 'Bloqueado'],
    },
    principalTrainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    trainings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
      },
    ],
    secondaryTrainers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Member = mongoose.model('Member', memberSchema)
export default Member
