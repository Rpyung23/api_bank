const connDB = require('../config/conn')
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
}


module.exports = ClientModel