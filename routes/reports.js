//npm requires
const express = require('express');
//Project's own requires
const pool = require('../database');
//Initializations 
const router = express.Router();
//Rutas


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







router.post('/add', async (req, res) => {
    const { cli_name } = req.body;
    const prueba = {
        cli_name
    };
    console.log(prueba);
    await pool.query('INSERT INTO client set ?', [prueba]);
    res.send('Completado')
});

router.get('/get', async (req, res) => {
    const clientes = await pool.query('SELECT * FROM client WHERE cli_id <> 3  ORDER BY cli_name ASC');
    console.log(clientes);
    res.json(clientes)
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
   const result = await pool.query('DELETE FROM client WHERE cli_id =' + id);
    res.json(result);
});

//Funcion para imprimir errores
function printError(e){
	if(e!=null){
		console.log(e)
	}
}
module.exports = router;
