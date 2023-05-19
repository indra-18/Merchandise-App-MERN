require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const productsRouter = require('./routes/product.routes')
const usersRouter = require('./routes/user.routes')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors())
const PORT = process.env.PORT || 5000

app.use('/products', productsRouter)
app.use('/', usersRouter)

app.get('/', (req, res) => {
    res.send('Hello From Frenzy Backend Application')
})

app.post("/create-payment-intent", async (req, res) => {
    const { totalPrice } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })).catch(err => console.log(err.message))