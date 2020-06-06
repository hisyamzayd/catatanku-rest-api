const Pool = require('pg').Pool

const pool = new Pool({
    // //uncomment this for local use
    // user: 'me',
    // host: 'localhost',
    // database: 'catatanku',
    // password: 'password',
    // port: 5432

    //comment this if use local instead
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
                    res.status(err.status).send()
                }
                else {
                    res.status(200).json(results.rows)
                }
            }
        )
    }

    pool.end
}

//get only one catatan by id
const get_catatan_by_id = (req, res) => {
    const id = parseInt(req.query.id)

    pool.query(
        'SELECT * FROM catatan WHERE id = $1 limit 1', 
        [id], 
        (err, result) => {
            if (err) {
                res.status(err.status).send()
            }
            else {
                res.status(200).json(result.rows)
            }
        }
    )

    pool.end
}

//insert new rows catatan
const set_catatans = (req, res) => {
    const data = req.body.body
    let error = false
    let err_status = 0

    data.forEach(each => {
        pool.query(
            'INSERT INTO catatan (judul, isi) VALUES ($1, $2)',
            [each.judul, each.isi],
            (err, result) => {
                if (err) {
                    error = true
                    err_status = err.status
                    throw err
                }
            }
        )
    });

    if (!error) {
        res.status(201).send(`${data.length} new catatan added into database`)
    }
    else {
        res.status(err_status).send()
    } 

    pool.end
}

//update existing catatan
const update_catatans = (req, res) => {
    const data = req.body.body
    let error = false
    let err_status = 0

    data.forEach(each => {
        pool.query(
            'UPDATE catatan SET judul = $1, isi = $2, waktu = current_timestamp WHERE id = $3',
            [each.judul, each.isi, each.id],
            (err, result) => {
                if (err) {
                    error = true
                    err_status = err.status
                    throw err
                }
            }
        )
    });

    if (!error) {
        res.status(200).send(`${data.length} catatan has been updated`)
    }
    else {
        res.status(err_status).send()
    } 

    pool.end
}

//delete existing catatan
const delete_catatan = (req, res) => {
    const id = parseInt(req.query.id)

    pool.query(
        'DELETE FROM catatan WHERE ID = $1',
        [id],
        (err, result) => {
            if (err) {
                res.status(err.status).send()
            }
            else {
                res.status(200).send(`catatan deleted with ID: ${id}`)
            }
        }
    )

    pool.end
}

//export all queries, agar bisa di read dari index.js
module.exports = {
    get_catatan,
    get_catatan_by_id,
    set_catatans,
    update_catatans,
    delete_catatan
}