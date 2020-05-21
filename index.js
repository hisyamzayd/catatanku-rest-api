const express = require('express')
const body_parser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000 //for heroku purpose system
const db = require('./catatan_routes')

app.use(body_parser.json())
app.use(
    body_parser.urlencoded({
        extended: false
    })
)

//set title
app.set('title', 'Catatanku REST API')

//all routes
//index route
app.get('/', (req, res) => {
    res.status(200).send(`
        Hello, welcome     
    `)
})

//get all catatan
app.use('/catatan/all', db.get_catatan)

//get single catatan by id
app.get('/catatan', db.get_catatan_by_id)

//insert new catatan
app.post('/catatan', db.set_catatan)

//update existing catatan
app.put('/catatan', db.update_catatan)

//delete existing catatan
app.delete('/catatan', db.delete_catatan)


//express listen to port
app.listen(port, () =>{
    console.log(`app already running on port: ${port}`)
})