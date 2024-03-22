const ClientModel = require('../model/client.model')
class ClientController
{
    static async readProfileClientController(id_client){
        return await ClientModel.readProfileClientModel(id_client)
    }

    static async loginClientController(usuario,password){
        return await ClientModel.loginClientModel(usuario,password)
    }

    static async readDataClientNotificationController(id_code_client,dni_client){
        return await ClientModel.readDataClientNotificationModel(id_code_client,dni_client)
    }

    static async updateTokenNotificationController(id_code_client,usuario_banca,token){
        return await ClientModel.updateTokenNotificationModel(id_code_client,usuario_banca,token)
    }
}

module.exports = ClientController