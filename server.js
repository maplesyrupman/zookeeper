const express = require('express')
const { animals } = require('./data/animals.json');
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')

//parse incoming array or string data
app.use(express.urlencoded({ extended: true }))
//parse incoming json data
app.use(express.json())
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)
//provides routes for assets in public
app.use(express.static('public'))


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})
