
const express = require('express')
const connectionDB = require('./config/connnectionDB')
// const FileSchema = require('./models/schema')
const { errorHandler } = require('./middleware/errorHandler')
const { uploadFile, getAllFiles } = require('./controllers/fileController')
// const dotenv = require('dotenv').config()
// const dotenv = require('dotenv').config()
const fs = require('fs')
const cors = require('cors')
const dotenv = require('dotenv').config();
const app = express()

connectionDB()

app.use('/uploadFolder', express.static('backend/uploadFolder'));

app.use(express.json())
app.use(cors())

app.post('/api/upload', uploadFile);
app.get('/getall', getAllFiles)


app.use(errorHandler)


app.listen(4000, () => console.log("Running on 4000"))