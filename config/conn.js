const odbc = require('odbc');
const datosConn = {
        host: '172.31.1.240',
        user: 'informix',
        db: 'econx',
        pass: 'Inf0115o',
        port: 1525,
        protocolo: 'onsoctcp',
        dsn:'CORE_BANK_64'
    }
const connDB =  async (code_company) => {
    try {
        var cn = `DSN=CORE_BANK_64;UID=${datosConn.user};PWD=${datosConn.pass};DATABASE=${datosConn.db}`
        console.log(cn)
        return await odbc.connect(cn);
        console.log("CONN DB INFORMIX - ODBC OK")
    }catch (e) {
        console.log(e)
        return null
    }
};

module.exports = connDB;
