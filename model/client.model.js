const connDB = require('../config/conn')
const checkPassword = require('../util/checkPassword')
class ClientModel
{
    static async readProfileClientModel(id_client){
        try {
            var conn = await connDB()
            var data = await conn.query("SELECT \tclien_cod_clien, clien_ide_clien, clien_nom_clien, clien_ape_clien," +
                "sexos_des_sexos, clien_dir_email, clien_tlf_celul,clien_fot_paths,clien_fir_paths " +
                "FROM cnxclien, cnxsexos WHERE clien_cod_sexos = sexos_cod_sexos AND clien_cod_clien = "+id_client)
            await conn.close()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async loginClientModel(usuario,password)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT UB.pk_usuario_banca,UB.contrasenia_banca,C.clien_cod_clien,C.clien_ide_clien,C.clien_nom_clien,C.clien_ape_clien " +
                "FROM cnx_usuario_banca AS UB INNER JOIN cnxclien AS C ON UB.fk_clien_cod_clien = C.clien_cod_clien " +
                "WHERE UB.pk_usuario_banca = '"+usuario+"'"
            var result = await conn.query(sql)
            await conn.close()
            return {data:result}
        }catch (e) {
            return {error:e.toString()}
        }
    }
}


module.exports = ClientModel