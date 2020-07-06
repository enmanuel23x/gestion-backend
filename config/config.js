module.exports = {
    database:{
		host: '10.48.13.154',//10.48.13.154
	    port: 3306,
	    user: 'nodeuser',//nodeuser
	    password : 'nodeuser1234',//nodeuser1234
	    database : 'dbGestionOcupacion',//Cambiar
		timezone: "+00:00",
		connectionLimit: 10,
		acquireTimeout: 30000
    },
    server:{
        host: "https://localhost", //Solo para mostrar en el log
        port: 5000
    }

};
