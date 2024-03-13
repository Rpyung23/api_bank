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
}

module.exports = ClientController