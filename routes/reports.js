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
    const request = await pool.query('SELECT * FROM request INNER JOIN client ON request.cli_id = client.cli_id where req_status <> 5 ORDER BY client.cli_name ASC, req_title ASC ');
    console.log(request);
    res.json(request);
});

// Ruta para listar users

router.get('/get_user', async (req, res) => {
    const users = await pool.query('SELECT * FROM user ORDER BY usr_name ASC');
    console.log(users);
    res.json(users);
});


//Funcion para imprimir errores
function printError(e){
	if(e!=null){
		console.log(e)
	}
}
module.exports = router
