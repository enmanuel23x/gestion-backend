module.exports = {
    database:{
		host: 'localhost',//10.48.13.154
	    port: 3306,
	    user: 'root',//nodeuser
	    password : '',//nodeuser1234
	    database : 'DB_NAME',//Cambiar
		timezone: "+00:00",
		connectionLimit: 10,
		acquireTimeout: 30000
    },
    server:{
        host: "https://10.48.13.156", //Solo para mostrar en el log
        port: 5000
    }

};
