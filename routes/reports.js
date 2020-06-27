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

//Funcion para imprimir errores
function printError(e){
	if(e!=null){
		console.log(e)
	}
}
module.exports = router
