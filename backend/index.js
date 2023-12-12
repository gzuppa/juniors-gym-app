import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import memberRoutes from './routes/memberRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()

connectDB()

//Routing
app.use('/api/users', userRoutes)
app.use('/api/members', memberRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`corriendo server en puerto ${PORT}`)
})
