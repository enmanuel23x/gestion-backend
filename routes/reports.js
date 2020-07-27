//npm requires
const express = require('express');
const DateDiff = require('date-diff');
//Project's own requires
const pool = require('../database');
//Initializations 
const router = express.Router()
//Rutas

// Ruta para listar request
router.get('/get_request', async (req, res) => {
    const ESTADO = 'open';
    const request = await pool.query(`SELECT * FROM request INNER JOIN client ON request.cli_id = client.cli_id where sta_id = '${ESTADO}' ORDER BY client.cli_name ASC, req_title ASC`);
    //console.log(request);	    console.log(request);
    res.json(request);
});

// Ruta para listar users

router.get('/get_user', async (req, res) => {
    const users = await pool.query('SELECT * FROM user ORDER BY usr_name ASC');
    //console.log(users);
    res.json(users);
});
// Ruta para request con su desviacion
router.get('/get_req_desv', async (req, res) => {

    const result = await pool.query(`SELECT req_id, cli_id, req_title, req_responsable, req_date, req_init_date, req_final_date, req_real_final_date, req_deviations_ptge, req_day_desv, 
                                     (SELECT cli_name FROM client WHERE cli_id = dbgestionocupacion.request.cli_id) AS cli_name 
                                     FROM dbgestionocupacion.request 
                                     ORDER BY cli_name ASC, req_title ASC`);
    res.json(result);
});


// Ruta para activities con su desviacion
router.get('/get_act_desv/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query(`SELECT act_id, activities.req_id,  act_trello_name, act_init_date, act_init_real_date, act_end_date, act_real_end_date, act_desv_percentage, act_day_desv, 
    (SELECT cli_name FROM client WHERE cli_id IN (SELECT cli_id FROM request WHERE request.req_id = '${id}')) AS cli_name, 
    (SELECT req_title FROM request WHERE request.req_id = '${id}') AS req_title, 
    (SELECT req_responsable  FROM request WHERE request.req_id = '${id}') AS req_responsable  
    FROM activities WHERE activities.req_id = '${id}' 
    ORDER BY act_init_date DESC , act_end_date DESC`);
    res.json(result);
});
router.get('/get_req/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query('SELECT boo_id, boo_start_date, boo_end_date, boo_percentage, (SELECT usr_name FROM user WHERE usr_id = dbgestionocupacion.booking.usr_id) AS usr_name, usr_id, (SELECT req_title FROM request WHERE req_id = dbgestionocupacion.booking.req_id) AS req_title, (SELECT cli_id FROM request WHERE req_id = dbgestionocupacion.booking.req_id) AS cli_id FROM dbgestionocupacion.booking WHERE req_id ='+ id);
    res.json(result);
});


router.get('/get_cli/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query('SELECT cli_id FROM request WHERE req_id = '+ id);
    res.json(result);
});

router.get('/update_desv', async (req, res) => {
    pool.query('SELECT act_id, act_init_date, act_end_date, act_init_real_date, act_real_end_date FROM activities;', async (err, conn) => {
        if(!err){
            let date1a, date2a, diff, date1b, date2b, real_diff, result = "";
            conn.forEach(element => {
                date1a = new Date(element.act_init_date);
                date2a = new Date(element.act_end_date);
                diff = new DateDiff(date1a, date2a).days();
                date1b = new Date(element.act_init_real_date);
                date2b = new Date(element.act_real_end_date);
                real_diff = new DateDiff(date1b, date2b).days();
                perc = Math.round((diff/real_diff)*10000)/100 == "Infinity" ? null : Math.round((diff/real_diff)*10000)/100;
                days = diff - real_diff
                result += "UPDATE activities SET act_day_desv = "+days+", act_desv_percentage = "+perc+" WHERE act_id =  "+element.act_id+";";
            });
            res.send(await pool.query(result))
        }
    });
});
module.exports = router
