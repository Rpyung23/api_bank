const connDB = require('../config/conn')
class TransactionModel {
    static async readLastTransactionClientModel(num_account)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT FIRST 10 mctad_num_ttran,trim(tmovi_des_tmovi) tmovi_des_tmovi," +
                "dmcta_cod_ctadp,dmcta_fec_mctad as fecha, TRIM(mctad_rzn_anula) as concepto," +
                "dmcta_val_dmcta as valor, mctad_cod_ofici as codigooficina," +
                "mctad_cod_cajas as codigocajas,tmovi_cod_tasie,TRIM(tasie_des_tasie) tasie_des_tasie " +
                "FROM cnxdmcta, cnxmctad, cnxtmovi, OUTER cnxtasie " +
                "WHERE dmcta_cod_ctadp = '"+num_account+"' AND dmcta_fec_mctad = mctad_fec_mctad " +
                "AND dmcta_cod_cajas = mctad_cod_cajas " +
                "AND dmcta_cod_ctadp = mctad_cod_ctadp AND dmcta_cod_tmovi = tmovi_cod_tmovi " +
                "AND tmovi_cod_tasie = tasie_cod_tasie ORDER BY dmcta_fec_mctad DESC"
            //console.log(sql)

            var result = await conn.query(sql)
            for (var i = 0;i<result.length;i++){
                result[i].valor = result[i].valor.toFixed(2)
            }
            return {data:result}
        }catch (e) {
            return {error:e.toString()}
        }
    }

    static async readTransactionLocalClientModel(num_account,code_transaction)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT FIRST 10 mctad_num_ttran,trim(tmovi_des_tmovi) tmovi_des_tmovi," +
                "dmcta_cod_ctadp,dmcta_fec_mctad as fecha, TRIM(mctad_rzn_anula) as concepto," +
                "dmcta_val_dmcta as valor, mctad_cod_ofici as codigooficina," +
                "mctad_cod_cajas as codigocajas,tmovi_cod_tasie,TRIM(tasie_des_tasie) tasie_des_tasie " +
                "FROM cnxdmcta, cnxmctad, cnxtmovi, OUTER cnxtasie " +
                "WHERE dmcta_cod_ctadp = '"+num_account+"' AND dmcta_fec_mctad = mctad_fec_mctad " +
                "AND dmcta_cod_cajas = mctad_cod_cajas " +
                "AND dmcta_cod_ctadp = mctad_cod_ctadp AND dmcta_cod_tmovi = tmovi_cod_tmovi " +
                "AND tmovi_cod_tasie = tasie_cod_tasie AND mctad_num_ttran = "+code_transaction
            //console.log(sql)

            var result = await conn.query(sql)
            for (var i = 0;i<result.length;i++){
                result[i].valor = result[i].valor.toFixed(2)
            }
            return {data:result}
        }catch (e) {
            return {error:e.toString()}
        }
    }

    static async createTransactionCLientLocalModel(cod_empresa,codoficina,codcajas,detail,
                                                   account_origin,account_destination,valtrans)
    {
        try {
            var conn = await connDB()
            var sql = "CALL rrf_trnsf_cnldij("+cod_empresa+","+codoficina+","+codcajas+",'"+detail+"','"+account_origin+"','"+account_destination+"',"+valtrans+")"
            //console.log(sql)
            var response = await conn.query(sql)
            await conn.close()
            return {data:response}
        }catch (e) {
           //console.log(e)
            return {error:e.toString()}
        }
    }

    static async createTransactionClientExternalModel(cod_empresa,cod_oficina,cod_caja,cli_empresa,cli_ofici,cod_clien,
                                                      dni_client,
                                                      nombre_clien,account_origin,valtrans,id_clien_dest,name_clien_dest,
                                                      codofi,account_des,type_account,detail)
    {
        try {
            if(detail == null || detail == undefined){
                detail = ""
            }

            nombre_clien = nombre_clien.replace(/�/g, '');

            var conn = await connDB()
            var sql = `CALL cnxprc_reg_spi01(${cod_empresa},${cod_oficina},${cod_caja},${cli_empresa},${cli_ofici},${cod_clien},'${dni_client}','${nombre_clien}','${account_origin}',
                                    ${valtrans},'${id_clien_dest}','${name_clien_dest}',${codofi},'${account_des}',${type_account},'${detail}',1);`
            console.log(sql)
            var response = await conn.query(sql)
            await conn.close()
            return {data:response}
        }catch (e) {
            //console.log(e)
            return  {error:e.toString()}
        }
    }


    static async createTransactionPagoFacilModel(cod_empresa,cod_oficina,cod_caja,detail_service,num_cuenta,
                                   valor)
    {
        try {
            var conn = await connDB()
            var sql = "EXECUTE PROCEDURE cnxprc_reg_nddct('"+cod_empresa+"','"+cod_oficina+"','"+cod_caja+"','"+detail_service+"','"+num_cuenta+"','',(SELECT UNIQUE(servi_cod_ccnta) FROM cnxservi WHERE servi_cod_tasie = 1 AND servi_des_servi LIKE '%FACILITO%'),'"+valor+"','','','','','','','','','"+valor+"',1)"
            var response = await conn.query(sql)
            await conn.close()
            return {data:response}
        }catch (e) {
            return {error:e.toString()}
        }
    }
}

module.exports = TransactionModel