const connDB = require('../config/conn')
class PingModel {
    static async pingModel(){
        try {
            var conn = await connDB()
            await conn.query("select * from cnxsexos;")
            await conn.close()
            return {data:'OK'}
        }catch (e) {
            console.log("CATCH PING MODEL")
            console.log(e)
            return {data:e.toString()}
        }
    }
}

module.exports = PingModel