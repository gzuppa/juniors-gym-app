import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  try {
    const dbKey = process.env.MONGO_URI
    const connection = await mongoose.connect(dbKey, {
        useUnifiedTopology:true,
        useNewUrlParser: true,
      })

    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(`MONGO CONECTADO EN ${url}`)
  } catch (error) {
    console.log(`error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB