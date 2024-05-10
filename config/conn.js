const odbc = require('odbc');
/*const datosConn = {
        host: '172.31.1.240',
        user: 'informix',
        //db: 'econx',
        db:'finantix',
        pass: 'Inf0115o',
        port: 1525,
        protocolo: 'onsoctcp',
        dsn:'CORE_BANK_64'
    }*/
const connDB =  async (code_company) => {
    try {
        var cn = `DSN=CORE_BANK`
        console.log(cn)
        return await odbc.connect({
            connectionString: cn,
            connectionTimeout: 50,
            loginTimeout: 10,
        });
    }catch (e) {
        console.log("CATCH CONNDB..")
        console.log(e.toString())
        return null
    }
};

module.exports = connDB;
