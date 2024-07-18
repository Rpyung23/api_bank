const connDB = require('../config/conn')
class InvestmentModel
{
    static async readInvestmentModel(codeclient){
        try {
            var conn = await connDB()
            var sql = "SELECT trim(inver_cod_inver) inver_cod_inver, trim(tinve_des_tinve) tinve_des_tinve, inver_fec_inici, inver_fec_venci,(select sum(dminv_val_dminv) " +
                "from cnxdminv,cnxtmovi where dminv_cod_inver = inver_cod_inver and dminv_cod_tmovi = tmovi_cod_tmovi " +
                "and tmovi_cod_tasie = 2) AS saldo FROM cnxinver, cnxtinve WHERE inver_cod_clien = " +codeclient+
                " AND inver_cod_tinve = tinve_cod_tinve AND inver_cod_einve = 1"
            var response = await conn.query(sql)
            await conn.close()
            for (var i = 0;i<response.length;i++)
            {
                response[i].saldo = response[i].saldo == null || response[i].saldo.isEmpty || response[i].saldo == 0 ? "0.00" : response[i].saldo.toFixed(2)
            }
            return response
        }catch (e) {
            console.log(e.toString())
            return []
        }
    }
}

module.exports = InvestmentModel