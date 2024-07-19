const connDB = require('../config/conn')
class BankcreditModel {
    static async readBankCreditModel(id_code_client){
        try {
            var conn = await connDB()
            var sql = "SELECT TRIM(clien_ide_clien) clien_ide_clien,TRIM(clien_nom_clien) clien_nom_clien," +
                "TRIM(clien_ape_clien) clien_ape_clien,sbtcr_cod_sbtcr,TRIM(sbtcr_des_sbtcr) sbtcr_des_sbtcr," +
                "credi_val_credi, credi_cod_credi,TO_CHAR(credi_fec_inici,'%Y-%m-%d') credi_fec_inici," +
                "credi_num_cuota,ecred_cod_ecred,TRIM(ecred_des_ecred) ecred_des_ecred FROM cnxsbtcr, " +
                "cnxcredi,cnxecred,cnxclien WHERE credi_cod_clien = clien_cod_clien AND  " +
                "sbtcr_cod_sbtcr = credi_cod_sbtcr AND credi_cod_ecred = ecred_cod_ecred AND " +
                `credi_cod_clien = ${id_code_client} AND ecred_cod_ecred != 5;`
            console.log(sql)
            var result = await conn.query(sql)
            await conn.close()
            for(var i = 0;i<result.length;i++){
                result[i].credi_val_credi = result[i].credi_val_credi.toFixed(2)
            }
            return {data:result}
        }catch (e) {
            console.log(e.toString())
            return {error:e.toString()}
        }
    }

    static async readDetailBankCreditModel(id_credit){
        try {
            var conn = await connDB()
            var sql = "select TO_CHAR(divid_fec_venci,'%Y-%m-%d') as FechaPago,divid_num_divid as NumeroDeCuota," +
                "(select sum(rbdiv_val_rbdiv) from cnxrbdiv where rbdiv_cod_credi = divid_cod_credi " +
                "and rbdiv_num_divid = divid_num_divid and rbdiv_cod_rubro = 1) as capital," +
                "(select sum(rbdiv_val_rbdiv) from cnxrbdiv where rbdiv_cod_credi = divid_cod_credi " +
                "and rbdiv_num_divid = divid_num_divid and rbdiv_cod_rubro in (2,3,5,10)) as interes," +
                "(select sum(rbdiv_val_rbdiv) from cnxrbdiv where rbdiv_cod_credi = divid_cod_credi " +
                "and rbdiv_num_divid = divid_num_divid and rbdiv_cod_rubro = 4) as intmora," +
                "(select sum(rbdiv_val_rbdiv) from cnxrbdiv where rbdiv_cod_credi = divid_cod_credi " +
                "and rbdiv_num_divid = divid_num_divid and " +
                "(rbdiv_cod_rubro > 10 or rbdiv_cod_rubro in (6,7,8,9))) as otros," +
                "TRIM((select edivi_des_edivi from cnxedivi where edivi_cod_edivi = divid_cod_edivi)) as estado," +
                "TO_CHAR(divid_fec_ulpag,'%Y-%m-%d') as feculpag from cnxdivid where divid_cod_credi='"+id_credit+"' " +
                "order by divid_num_divid"
            //console.log(sql)
            var result = await conn.query(sql)
            await conn.close()
            for(var i = 0;i<result.length;i++){
                result[i].total_pagar = (result[i].capital +
                    (result[i].interes == null ? 0 : result[i].interes) +
                    (result[i].intmora == null ? 0 : result[i].intmora) +
                    (result[i].otros == null ? 0 :result[i].otros)).toFixed(2)
            }
            return {data:result}
        }catch (e) {
            return {msm:e.toString()}
        }
    }
}

module.exports = BankcreditModel