const express = require('express')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
//app.use(cors())
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)
//app.use(cors());

require('dotenv').config()
//Routes Declaration
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const braintreeRoutes = require('./routes/braintreeRoutes')
//Database Configuration
mongoose.connect('mongodb+srv://oualione:Ouali-1995@cluster0.tzggodf.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to Database Successfully ..')
}).catch((error) => {
    console.log('Coonection failed ..' + error.message)
})
        

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', braintreeRoutes)


const port = process.env.PORT || 7001

app.listen(port ,() => console.log('Listning to port : '+port+' ...'))
