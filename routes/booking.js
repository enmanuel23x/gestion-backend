//npm requires
const express = require('express');
//Project's own requires
const pool = require('../database');
//Initializations 
const router = express.Router();
//Rutas

router.get('/get_booking', async (req, res) => {
    const booking = await pool.query('SELECT * FROM booking');
    console.log(booking);
    res.json(booking);
});

// delete a booking

router.get('/delete_booking/:id', async (req, res) => {

    const { id } = req.params;
    const result = await pool.query('DELETE FROM booking WHERE boo_id =' + id);
    res.json(result);

});




router.post('/data', (req, res) => {
    const { email } = req.body;
    pool.query('SELECT * FROM example WHERE email = "'+email+'"', (err, conn) => {
        printError(err);
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
