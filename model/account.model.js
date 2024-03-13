const connDB = require('../config/conn')
class AccountModel
{
    static async readAccountClientModel(id_client)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT CB.ctadp_cod_ctadp,CB.ctadp_cod_clien,TRIM(CB.ctadp_nom_impri) ctadp_nom_impri," +
                "CB.ctadp_sal_dispo FROM cnxctadp AS CB WHERE CB.ctadp_cod_clien = "+id_client
            var result = await conn.query(sql)

           for(var i = 0;i<result.length;i++){
                result[i].ctadp_sal_dispo = result[i].ctadp_sal_dispo.toFixed(2)
            }
            await conn.close()
            return {data:result}
        }catch (e) {
            return {error:e.toString()}
        }
    }
}

module.exports = AccountModel