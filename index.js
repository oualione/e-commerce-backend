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
app.use(cors({
  origin: 'https://mern-react-20d8.onrender.com', // Replace with your frontend URL
  credentials: true, // Enable cookies for authorized requests (if needed)
}));
app.get('/api/data', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://mern-react-puce.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // ... send your API response
  });

//app.use(cors());

require('dotenv').config()
//Routes Declaration
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const braintreeRoutes = require('./routes/braintreeRoutes')
//Database Configuration
// mongoose.connect('mongodb+srv://oualione:Ouali-1995@cluster0.tzggodf.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0').then(() => {
//     console.log('Connected to Database Successfully ..')
// }).catch((error) => {
//     console.log('Coonection failed ..' + error.message)
// })
        

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', braintreeRoutes)


const port = process.env.PORT || 7001

app.listen(port ,() => console.log('Listning to port : '+port+' ...'))
