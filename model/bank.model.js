const connDB = require('../config/conn')
const {eliminarCaracteresEspeciales} = require('../util/string')
class BankModel {
    static async readListBankActiveModel(){
        try {
            var conn = await connDB()
            var sql = "SELECT B.ifina_cod_ifina,TRIM(B.ifina_nom_ifina) ifina_nom_ifina," +
                "TRIM(B.ifina_cod_ccnta) ifina_cod_ccnta,TRIM(B.ifina_bce_ctaco) ifina_bce_ctaco FROM cnxifina AS B order by TRIM(B.ifina_nom_ifina)"
            //console.log(sql)
            var result = await conn.query(sql)
            await conn.close()
            var response = result
            for(var i = 0;i < response.length;i++){
                response[i].ifina_nom_ifina = eliminarCaracteresEspeciales(response[i].ifina_nom_ifina)
            }
            return {data:response}
        }catch (e) {
            return {error:e.toString()}
        }
    }
}

module.exports = BankModel