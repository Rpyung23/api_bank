const connDB = require('../config/conn')
class ContactModel {
    static async checkContacModel(account)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT CB.ctadp_cod_ctadp,concat(TRIM(CC.clien_nom_clien),concat(' ',CC.clien_ape_clien)) name " +
                "FROM cnxctadp AS CB INNER JOIN cnxclien AS CC ON CB.ctadp_cod_clien = CC.clien_cod_clien WHERE CB.ctadp_cod_ctadp = '"+account+"'"
            var response = await conn.query(sql)
            await conn.close()
            return {data:response[0]}
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

    static async createContactModel(usuario_banca, cuenta, isahorro, code_banco,
                                    name, dni, pasaport, ruc, isexterno)
    {
        try {
            var conn = await connDB()
            var sql = "INSERT INTO cnxcontact (fk_usuario_banca, num_ctadp_cod_ctadp, isahorro, fk_ifina_cod_ifina," +
                "namecontact, dnicontact, pasaportcontact, ruccontact, isexterno) " +
                "VALUES ('rui150012','256889',1,8,'Juan Carlos Mayorga Caceres',NULL,NULL,'0604666982001',1);"
            await conn.query()
            await conn.close()
        }catch (e) {
            console.log(e.toString())
        }
    }
}

module.exports = ContactModel