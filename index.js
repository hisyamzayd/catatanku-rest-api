const express = require('express')
const body_parser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000 //for heroku purpose system
const db = require('./catatan_routes')

app.use(body_parser.json())

//all routes
//index route
app.get('/', (req, res) => {
    if (port == 3000) {
        res.status(200).sendFile(path.join(__dirname + '/welcome_local.html'))
    }
    else {
        res.status(200).sendFile(path.join(__dirname + '/welcome_heroku.html'))
    }
})

//nyelip, nyoba video
app.get('/video', (req, res) => {
    let nama_file = req.query.nama
    let video_dir = __dirname + '/video/' + nama_file

    res.status(200).sendFile(path.join(video_dir))
})

//get all catatan
app.use('/catatan/all', db.get_catatan)

//get single catatan by id
app.get('/catatan', db.get_catatan_by_id)

//insert new catatan
app.post('/catatan', db.set_catatans)

//update existing catatan
app.put('/catatan', db.update_catatans)

//delete existing catatan
app.delete('/catatan', db.delete_catatan)


//express listen to port
app.listen(port, () =>{
    console.log(`app already running on port: ${port}`)
})