const connDB = require('../config/conn')
class ServiceModel {
    static async readTypeServiceModel(){
        try {
            var conn = await connDB()
            var sql = "SELECT TS.id_tiposervicio,TRIM(TS.nombre_servicio) nombre_servicio," +
                "TRIM(TS.detalle_service) detalle_service,TS.url_foto FROM tipo_servicio AS TS " +
                "WHERE TS.estado_servicio = 1"
            var data = await conn.query(sql)
            await conn.close()
            return {response:data}
        }catch (e) {
            console.log(e)
            return {error:e.toString()}
        }
    }
}

module.exports = ServiceModel