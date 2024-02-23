const ClientModel = require('../model/client.model')
class ClientController
{
    static async readProfileClientController(id_client){
        return await ClientModel.readProfileClientModel(id_client)
    }
}

module.exports = ClientController