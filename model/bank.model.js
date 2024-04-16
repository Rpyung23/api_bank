const connDB = require('../config/conn')
class BankModel {
    static async readBankActive(){
        try {
            var conn = await connDB()
            var sql = "SELECT B.ifina_cod_ifina,TRIM(B.ifina_nom_ifina) ifina_nom_ifina," +
                "TRIM(B.ifina_cod_ccnta) ifina_cod_ccnta,TRIM(B.ifina_bce_ctaco) ifina_bce_ctaco FROM cnxifina AS B"
            var result = await conn.query(sql)
            await conn.close()
            return {data:result}
        }catch (e) {
            return {error:e.toString()}
        }
    }
}