const Pool = require('pg').Pool

const pool = new Pool({
    // use this for local use without heroku. to run local instead : heroku local web
    // user: 'me',
    // host: 'localhost',
    // database: 'catatanku',
    // password: 'password',
    // port: 5432
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

//queries
//get all catatan
const get_catatan = (req, res) => {
    if (req.method !== "GET") {
        res.status(405).send('method not allowed')
    }
    else {
        pool.query(
            'SELECT * FROM catatan ORDER BY waktu DESC', 
            (err, results) => {
                if (err) {
                    throw err
                }
                res.status(200).json(results.rows)
            }
        )
    }
}

//get only one catatan by id
const get_catatan_by_id = (req, res) => {
    const id = parseInt(req.query.id)

    pool.query(
        'SELECT * FROM catatan WHERE id = $1 limit 1', 
        [id], 
        (err, result) => {
            if (err) {
                throw err
            }
            res.status(200).json(result.rows)
        }
    )
}

//insert new catatan
const set_catatan = (req, res) => {
    const { judul, isi } = req.body

    pool.query(
        'INSERT INTO catatan (judul, isi) VALUES ($1, $2)', 
        [judul, isi], 
        (err, result) => {
            if (err) {
                throw err
            }
            res.status(201).send(`${result.rowCount} new catatan added into database`)
        }
    )
}

//update existing catatan
const update_catatan = (req, res) => {
    const id = parseInt(req.query.id)
    const { judul, isi } = req.body

    pool.query(
        'UPDATE catatan SET judul = $1, isi = $2, waktu = current_timestamp WHERE ID = $3',
        [judul, isi, id],
        (err, result) => {
            if (err) {
                throw err
            }
            res.status(200).send(`catatan updated with ID: ${id}`)
        }
    )
}

//delete existing catatan
const delete_catatan = (req, res) => {
    const id = parseInt(req.query.id)

    pool.query(
        'DELETE FROM catatan WHERE ID = $1',
        [id],
        (err, result) => {
            if (err) {
                throw err
            }
            res.status(200).send(`catatan deleted with ID: ${id}`)
        }
    )
}

//export all queries, agar bisa di read dari index.js
module.exports = {
    get_catatan,
    get_catatan_by_id,
    set_catatan,
    update_catatan,
    delete_catatan
}