require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const productsRouter = require('./routes/product.routes')
const usersRouter = require('./routes/user.routes')


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors())
const PORT = process.env.PORT || 5000

app.use('/products', productsRouter)
app.use('/', usersRouter)

app.get('/', (req, res) => {
    res.send('Hello From Frenzy Backend Application')
})

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })).catch(err => console.log(err.message))