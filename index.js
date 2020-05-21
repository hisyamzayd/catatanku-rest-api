const express = require('express')
const body_parser = require('body-parser')

const app = express()
const port = 3000 || process.env.PORT //for heroku purpose system
const db = require('./catatan_routes')

app.use(body_parser.json())
app.use(
    body_parser.urlencoded({
        extended: true
    })
)

//all routes
//index route
app.get('/', (req, res) => {
    res.status(200).send(`app success running on port: ${port}`)
})

//get all catatan
app.get('/catatan', db.get_catatan)

//get single catatan by id
app.get('/catatan/:id', db.get_catatan_by_id)

//insert new catatan
app.post('/catatan', db.set_catatan)

//update existing catatan
app.put('/catatan/:id', db.update_catatan)

//delete existing catatan
app.delete('/catatan/:id', db.delete_catatan)


//express listen to port
app.listen(port, () =>{
    console.log(`app already running on port: ${port}`)
})