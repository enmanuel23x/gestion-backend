module.exports = {
    database:{
		host: 'localhost',//10.48.13.154
	    port: 3306,
	    user: 'root',//nodeuser
	    password : 'revl1994',//nodeuser1234
	    database : 'db_gestion_ocupacion',//Cambiar
		timezone: "+00:00",
		connectionLimit: 10,
		acquireTimeout: 30000
    },
    server:{
        host: "https://10.48.13.156", //Solo para mostrar en el log
        port: 5000
    }

};
