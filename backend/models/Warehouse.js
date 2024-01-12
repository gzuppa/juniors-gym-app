import mongoose from 'mongoose'

const warehouseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: ['Aparato', 'Mercancía', 'Otro'],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Warehouse = mongoose.model('Warehouse', warehouseSchema)
export default Warehouse
