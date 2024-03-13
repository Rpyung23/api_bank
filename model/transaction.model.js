const connDB = require('../config/conn')
class TransactionModel {
    static async readLastTransactionClientModel(num_account)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT FIRST 10 dmcta_fec_mctad as fecha, TRIM(mctad_rzn_anula) as concepto," +
                "dmcta_val_dmcta as valor, mctad_cod_ofici as codigooficina," +
                "mctad_cod_cajas as codigocajas,tmovi_cod_tasie,TRIM(tasie_des_tasie) tasie_des_tasie " +
                "FROM cnxdmcta, cnxmctad, cnxtmovi, OUTER cnxtasie " +
                "WHERE dmcta_cod_ctadp = '"+num_account+"' AND dmcta_fec_mctad = mctad_fec_mctad " +
                "AND dmcta_cod_cajas = mctad_cod_cajas " +
                "AND dmcta_cod_ctadp = mctad_cod_ctadp AND dmcta_cod_tmovi = tmovi_cod_tmovi " +
                "AND tmovi_cod_tasie = tasie_cod_tasie ORDER BY dmcta_fec_mctad DESC"

            var result = await conn.query(sql)
            for (var i = 0;i<result.length;i++){
                result[i].valor = result[i].valor.toFixed(2)
            }
            return {data:result}
        }catch (e) {
            return {error:e.toString()}
        }
    }
}

module.exports = TransactionModel