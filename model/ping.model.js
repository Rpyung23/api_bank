const connDB = require('../config/conn')
class PingModel {
    static async pingModel(){
        try {
            var conn = await connDB()
            await conn.close()
            return {data:'OK'}
        }catch (e) {
            console.log("CATCH PING MODEL")
            return {data:e.toString()}
        }
    }
}

module.exports = PingModel