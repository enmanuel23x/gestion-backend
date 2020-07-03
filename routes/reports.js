//npm requires
const express = require('express');
//Project's own requires
const pool = require('../database');
//Initializations 
const router = express.Router()
//Rutas

// Ruta para listar request
router.get('/get_request', async (req, res) => {
    const ESTADO = 'finalizado';
    const request = await pool.query(`SELECT * FROM request INNER JOIN client ON request.cli_id = client.cli_id where sta_id <> '${ESTADO}' ORDER BY client.cli_name ASC, req_title ASC`);
    //console.log(request);	    console.log(request);
    res.json(request);	    res.json(request);
});

// Ruta para listar users

router.get('/get_user', async (req, res) => {
    const users = await pool.query('SELECT * FROM user ORDER BY usr_name ASC');
    //console.log(users);
    res.json(users);
});

router.get('/get_req/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query('SELECT boo_id, boo_start_date, boo_end_date, boo_percentage, (SELECT usr_name FROM user WHERE usr_id = dbGestionOcupacion.booking.usr_id) AS usr_name, usr_id, (SELECT req_title FROM request WHERE req_id = dbGestionOcupacion.booking.req_id) AS req_title, (SELECT cli_id FROM request WHERE req_id = dbGestionOcupacion.booking.req_id) AS cli_id FROM dbGestionOcupacion.booking WHERE req_id ='+ id);
    res.json(result);
});


router.get('/get_cli/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query('SELECT cli_id FROM request WHERE req_id = '+ id);
    res.json(result);
});

module.exports = router
