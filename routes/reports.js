//npm requires
const express = require('express');
//Project's own requires
const pool = require('../database');
//Initializations 
const router = express.Router()
//Rutas
router.post('/data', (req, res) => {
    const { email } = req.body
    pool.query('SELECT * FROM example WHERE email = "'+email+'"', (err, conn) => {
        printError(err)
        res.json(conn)
    });
})


// Ruta para listar request
router.get('/get_request', async (req, res) => {
    const ESTADO = 'finalizado';
    const request = await pool.query(`SELECT * FROM request INNER JOIN client ON request.cli_id = client.cli_id where sta_id <> '${ESTADO}' ORDER BY client.cli_name ASC, req_title ASC`);
    console.log(request);	    console.log(request);
    res.json(request);	    res.json(request);
});

// Ruta para listar users

router.get('/get_user', async (req, res) => {
    const users = await pool.query('SELECT * FROM user ORDER BY usr_name ASC');
    console.log(users);
    res.json(users);
});

router.get('/get_req/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query('SELECT boo_start_date, boo_end_date, boo_percentage, (SELECT usr_name FROM user WHERE usr_id = db_gestion_ocupacion.booking.usr_id) AS name, (SELECT req_title FROM request WHERE req_id = db_gestion_ocupacion.booking.req_id) AS req_name FROM db_gestion_ocupacion.booking WHERE req_id ='+ id);
    res.json(result);
});

//Funcion para imprimir errores
function printError(e){
	if(e!=null){
		console.log(e)
	}
}
module.exports = router
