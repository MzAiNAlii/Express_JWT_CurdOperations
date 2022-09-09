import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

import mongoose from 'mongoose'

import verifyToken from './middlewares/verifytoken'

import userRouter from './routes/auth'

import employeeRouter from './routes/empolyees'

const app = express ();

app.use(express.json());

app.use("/auth",userRouter)

app.use("/employees",employeeRouter)

app.use(verifyToken)

mongoose.connect(process.env.MONGO_URI!)
.then( () => {

    app.listen(3000, () => {

        console.log("Server up and running on port 3000")
    
    })

})
.catch( err => {

    console.log("Server Error")
})






