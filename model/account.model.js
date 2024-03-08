const connDB = require('../config/conn')
class AccountModel
{
    static async readAccountClientModel(id_client)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT CB.ctadp_cod_ctadp,CB.ctadp_cod_clien,CB.ctadp_nom_impri," +
                "CB.ctadp_sal_dispo FROM cnxctadp AS CB WHERE CB.ctadp_cod_clien = "+id_client
            var data = await conn.query(sql)
            return data[0]
        }catch (e) {
            return []
        }
    }
}

module.exports = AccountModel