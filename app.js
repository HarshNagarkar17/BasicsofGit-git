const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./db/tasks')

app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/v1/tasks', require('./route/tasks'));

const connect = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`server running on :${port}`))
    } catch (error) {
        console.log(error);
    }
}

connect();