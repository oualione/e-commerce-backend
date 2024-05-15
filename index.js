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
app.use(cors(
    {
        origin : ['https://mern-react-puce.vercel.app/login'],
        methods : ['POST', 'GET'],
        credentials : true
    }
));

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
