const connDB = require('../config/conn')
const checkPassword = require('../util/checkPassword')
class ClientModel
{
    static async readProfileClientModel(id_client){
        try {
            var conn = await connDB()
            var data = await conn.query("SELECT clien_cod_clien, TRIM(clien_ide_clien) clien_ide_clien, " +
                "TRIM(clien_nom_clien) clien_nom_clien, TRIM(clien_ape_clien) clien_ape_clien," +
                "TRIM(sexos_des_sexos) sexos_des_sexos, TRIM(clien_dir_email) clien_dir_email, " +
                "TRIM(clien_tlf_celul) clien_tlf_celul,clien_fot_paths,clien_fir_paths," +
                "TRIM(welcome_msm) welcome_msm FROM cnxclien, cnxsexos, cnx_usuario_banca " +
                "WHERE clien_cod_sexos = sexos_cod_sexos AND clien_cod_clien = "+id_client+" AND clien_cod_clien = fk_clien_cod_clien")
            await conn.close()
            return data[0]
        }catch (e) {
            console.log(e)
            return null
        }
    }
    static async updateProfileClientModel(id_client,welcome,phone,email)
    {
        try {
            var conn = await connDB()
            var sql = "UPDATE cnxclien SET clien_dir_email = '"+email+"',clien_tlf_celul = '"+phone+"' " +
                "WHERE clien_cod_clien = "+id_client
            var sql2 = "UPDATE cnx_usuario_banca SET welcome_msm = '"+welcome+"' WHERE fk_clien_cod_clien = "+id_client
            //console.log(sql)
            await conn.query(sql)
            await conn.query(sql2)
            await conn.close()
            return {estado:true}
        }catch (e) {
            console.log(e.toString())
            return {error:e.toString()}
        }
    }
    static async loginClientModel(usuario)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT UB.pk_usuario_banca,UB.contrasenia_banca,C.clien_cod_clien,TRIM(C.clien_ide_clien) clien_ide_clien," +
                "TRIM(C.clien_nom_clien) clien_nom_clien,TRIM(C.clien_ape_clien) clien_ape_clien," +
                "UB.imei_ult_ingreso,UB.ip_ult_ingreso,C.clien_cod_empre,C.clien_cod_ofici,trim(UB.welcome_msm) welcome_msm FROM cnx_usuario_banca AS UB INNER JOIN cnxclien AS C ON UB.fk_clien_cod_clien = C.clien_cod_clien " +
                "WHERE UB.pk_usuario_banca = '"+usuario+"' and estado = 1"
            //console.log(sql)
            var result = await conn.query(sql)
            await conn.close()
            //console.log(result)
            return {data:result}
        }catch (e) {
            console.log(e.toString())
            return {error:e.toString()}
        }
    }

    static async logOutClientModel(usuario){
        try {
            var conn = await connDB()
            var sql = "UPDATE cnx_usuario_banca SET fecha_ult_ingreso = NULL,token_ult_session = NULL," +
                "token_ult_notificacion = NULL,imei_ult_ingreso = NULL,ip_ult_ingreso = NULL " +
                "WHERE pk_usuario_banca = '"+usuario+"'"
            await conn.query(sql)
            await conn.close()
            return {response:true}
        }catch (e) {
            return {error:e.toString()}
        }
    }

    static async readDataClientNotificationModel(id_code_client,dni_client){
        try {
            var conn = await connDB()
            var sql = "SELECT TRIM(clien_tlf_celul) clien_tlf_celul,TRIM(clien_dir_email) clien_dir_email," +
                "UB.token_ult_notificacion FROM cnxclien LEFT JOIN cnx_usuario_banca UB ON UB.fk_clien_cod_clien = clien_cod_clien " +
                "WHERE clien_cod_clien = "+id_code_client+" AND clien_ide_clien = '"+dni_client+"'"
            /*var sql = "SELECT TRIM(clien_tlf_celul) clien_tlf_celul,TRIM(clien_dir_email) clien_dir_email FROM cnxclien WHERE clien_cod_clien = "+id_code_client+" " +
                "AND clien_ide_clien = '"+dni_client+"'"
            console.log(sql)*/
            var data = await conn.query(sql)
            await conn.close()
            return data[0]
        }catch (e) {
            console.log(`ERROR AL NOTIFICAR : ${e.toString()}`)
            return null
        }
    }

    static async updateTokenNotificationModel(id_code_client,usuario_banca,token)
    {
        try {
            var conn = await connDB()
            var sql = "UPDATE cnx_usuario_banca SET token_ult_notificacion = '"+token+"' WHERE pk_usuario_banca = '"+usuario_banca+"' AND fk_clien_cod_clien = "+id_code_client
            await conn.query(sql)
            await conn.close()
        }catch (e) {
            console.log(e)
        }
    }

    static async updateDataInfoLoginModel(id_code_client,usuario_banca,imei,ip)
    {
        try {
            var conn = await connDB()
            var sql = "UPDATE cnx_usuario_banca SET imei_ult_ingreso = '"+imei+"',ip_ult_ingreso = '"+ip+"' WHERE pk_usuario_banca = '"+usuario_banca+"' AND fk_clien_cod_clien = "+id_code_client
            //var sql = "UPDATE cnx_usuario_banca SET imei_ult_ingreso = ${imei},ip_ult_ingreso=${ip} WHERE pk_usuario_banca = '"+usuario_banca+"' AND fk_clien_cod_clien = "+id_code_client
            console.log(sql)
            await conn.query(sql)
            await conn.close()
            return {estado:true}
        }catch (e) {
            console.log(e)
            return {error:e.toString()}
        }
    }

    static async readCajaClientModel(id_code_client,cod_oficina)
    {
        try {
            var conn = await connDB()
            var sql = "SELECT FIRST 1 cajas_cod_cajas FROM cnxcajas WHERE cajas_des_cajas = 'CANALES_DIGITALES' AND cajas_cod_ofici = "+cod_oficina
            var response = await conn.query(sql)
            await conn.close()
            return {data:response[0]}
        }catch (e) {
            console.log(e.toString())
            return {error:e.toString()}
        }
    }

    static async updateWelcomeMsmModel(id_code_client,usuario_banca,welcome){
        try {
            var conn = await connDB()
            var sql = "UPDATE cnx_usuario_banca SET welcome_msm = '"+welcome+"' WHERE pk_usuario_banca = '"+usuario_banca+"' AND fk_clien_cod_clien = "+id_code_client
            await conn.query(sql)
            await conn.close()
            return {data:true}
        }catch (e) {
            return {error:e.toString()}
        }
    }
}


module.exports = ClientModel