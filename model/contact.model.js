const connDB = require('../config/conn')
class ContactModel {
    static async readNewDataContacLocalModel(account)
    {
        try {
            var conn = await connDB()
            // TRIM(CB.ctadp_nom_impri) ctadp_nom_impri,trim(concat(concat(trim(CL.clien_nom_clien),' '),trim(CL.clien_ape_clien))) name_complete
            var sql = "SELECT CX.id_cnxcontact,UB.pk_usuario_banca,TRIM(CB.ctadp_cod_ctadp) ctadp_cod_ctadp," +
                "TRIM(CB.ctadp_nom_impri) ctadp_nom_impri " +
                "FROM cnxctadp AS CB LEFT JOIN cnxcontact AS CX ON CB.ctadp_cod_ctadp = CX.num_ctadp_cod_ctadp " +
                "LEFT JOIN cnx_usuario_banca AS UB ON UB.pk_usuario_banca = CX.fk_usuario_banca " +
                "LEFT JOIN cnxclien AS CL ON CB.ctadp_cod_clien = CL.clien_cod_clien " +
                "WHERE CB.ctadp_cod_ctadp = '"+account+"' AND CB.ctadp_cod_ectad = 1"
            var response = await conn.query(sql)
            await conn.close()
            return {data:response}
        }catch (e) {
            return {error:e.toString()}
        }

    }
    static async readMyContactModel(usuario)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT TRIM(C.num_ctadp_cod_ctadp) num_ctadp_cod_ctadp,TRIM(C.namecontact) namecontact," +
                "TRIM(C.dnicontact) dnicontact,TRIM(C.pasaportcontact) pasaportcontact," +
                "TRIM(C.ruccontact) ruccontact,C.isahorro,C.isexterno,CX.ifina_cod_ifina,TRIM(CX.ifina_nom_ifina) ifina_nom_ifina " +
                "FROM cnxcontact AS C left JOIN cnxifina AS CX ON C.fk_ifina_cod_ifina = CX.ifina_cod_ifina " +
                "WHERE fk_usuario_banca = '"+usuario+"'"
            console.log(sql)
            var result = await conn.query(sql)
            await conn.close()
            return {data:result}
        }catch (e) {
            return {error:e.toString()}
        }
    }

    static async createContactLocalModel(usuario_banca,account,name_complete)
    {
        try {
            var conn = await connDB()
            var sql = `INSERT INTO cnxcontact (fk_usuario_banca, num_ctadp_cod_ctadp, isahorro, 
                          fk_ifina_cod_ifina, namecontact, dnicontact, pasaportcontact, ruccontact, isexterno) 
                          VALUES ('${usuario_banca}', '${account}', 1, null,'${name_complete}', null, null, null, 0)`
            //console.log(sql)
            await conn.query(sql)
            await conn.close()
            return {data:'ok'}
        }catch (e) {
            //console.log(e)
            return {error:e.toString()}
        }
    }

    static async checkExistContactModel(usuario_banca,account){
        try {
            var conn = await connDB()
            var sql = "SELECT COUNT(*) totContact FROM cnxcontact AS CX " +
                "WHERE CX.num_ctadp_cod_ctadp = '"+account+"' AND CX.fk_usuario_banca = '"+usuario_banca+"'"
            var result = await conn.query(sql)
            //console.log("QUERY")
            await conn.close()
            return {data:result[0].totcontact}
        }catch (e) {
            console.log(e)
            return {error:e.toString()}
        }
    }

}

module.exports = ContactModel