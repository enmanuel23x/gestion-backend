//npm requires
const express = require('express');
//Project's own requires
const pool = require('../database');
//Initializations 
const router = express.Router()
//Rutas
router.get('/booking', (req, res) => {
    pool.query(`Select x.usr_name, x.req_id, ROUND(x.boo_percentage,0) AS boo_percentage, x.cli_name,
    CASE
        WHEN x.boo_start_date = '01/01/1900' THEN '--'
        ELSE x.boo_start_date end AS boo_start_date, 
    CASE
        WHEN x.boo_end_date = '31/12/9999' THEN '--'
        ELSE x.boo_end_date end AS boo_end_date
      FROM (
            Select (SELECT usr_name FROM user WHERE usr_id = db_gestion_ocupacion.booking.usr_id) AS usr_name , req_id, boo_percentage, (SELECT cli_name FROM client WHERE cli_id = db_gestion_ocupacion.booking.cli_id) AS cli_name, boo_start_date, boo_end_date FROM db_gestion_ocupacion.booking
                UNION
            SELECT subquery_1.usr_name, 'Desocupación' as req_id, 100 - subquery_1.boo_percentage as boo_percentage, subquery_1.cli_name,subquery_1.boo_start_date, subquery_1.boo_end_date
                FROM (
                    SELECT (SELECT usr_name FROM user WHERE usr_id = db_gestion_ocupacion.booking.usr_id) AS usr_name, sum(boo_percentage) as boo_percentage, '----' AS cli_name, '01/01/1900' boo_start_date, '31/12/9999' boo_end_date
                        FROM db_gestion_ocupacion.booking
                        WHERE (cast(boo_start_date as date) <= cast((now()) as date)
                            AND cast(boo_end_date as DATE) >= cast((now()) as date))
                        group by 1
                ) subquery_1
        ) x
    WHERE boo_percentage > 0.01
    order by x.usr_name, x.boo_end_date`, (err, conn) => {
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
