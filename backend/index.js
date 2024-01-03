import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import memberRoutes from './routes/memberRoutes.js'
import trainingRoutes from './routes/trainingRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()
connectDB()

const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
    }
  },
}

app.use(cors(corsOptions))

//Routing
app.use('/api/users', userRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/trainings', trainingRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
