require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/user.routes')
const errorMiddleware = require('./middleware/error.middleware')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try{
        app.listen(PORT, () => {
            console.log('server started on port ', PORT)
        })
    }catch(e) {
        console.log(e);
    }
}
start();