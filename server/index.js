const express = require('express');
const mongoose = require('mongoose');
const config = require("./config/dev")
const Rent = require('./models/rental.model')
const FakeDB = require('./seed');

const rentalRoutes = require('./routes/rental.routes')



mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const fakeDB = new FakeDB();
        fakeDB.seedDb();

    }).catch(err => console.log(err));


const app = express();
app.use('/api/v1/rentals', rentalRoutes);

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log("I am running!", port)
})
