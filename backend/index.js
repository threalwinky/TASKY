import express from 'express'
import cors  from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {taskModel} from './taskModel.js'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dotenv.config()
const PORT = process.env.PORT
const MDB = process.env.MDB

mongoose.connect(MDB)
.then( console.log(`Database connected`))
.catch((err) => console.log(err))

app.post('/get', async (req, res) => {
    const taskFind = await taskModel.find()
    console.log(taskFind)
    res.json(taskFind)
})

app.post('/add', (req, res) => {
    const name = req.body.name
    const taskToAdd = {
        name : name,
        done : false
    }
    taskModel.insertMany([taskToAdd])
    .then(console.log(`Add successfully`))
    .catch((err) => console.log(err))
    return res.status(200).send("OK")
})

app.post('/delete', async (req, res) => {
    const id = req.body.id
    const taskFind = await taskModel.findById(id)
    console.log(taskFind)
    taskModel.deleteOne(taskFind)
    .then(console.log(`Delete successfully`))
    .catch((err) => console.log(err))
    return res.status(200).send("OK")
})

app.post("/update", async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const taskFind = await taskModel.findById(id)
    console.log(taskFind)
    taskModel.updateOne(taskFind, {"name" : name}, {new: true, runValidators: true})
    .then(console.log(`Delete successfully`))
    .catch((err) => console.log(err))
    
    return res.status(200).send("OK")
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})