const ClientModel = require('../model/client.model')
class ClientController
{
    static async updatePasswordController(idClient,pass){
        return await ClientModel.updatePasswordModel(idClient,pass)
    }
    static async readDataValidateController(dni_client,searchDni){
        return await ClientModel.readDataValidateModel(dni_client,searchDni)
    }
    static async readProfileClientController(id_client){
        return await ClientModel.readProfileClientModel(id_client)
    }

    static async loginClientController(usuario){
        return await ClientModel.loginClientModel(usuario)
    }

    static async logOutClientModel(usuario){
        return await ClientModel.logOutClientModel(usuario)
    }

    static async readDataClientNotificationController(id_code_client,dni_client){
        return await ClientModel.readDataClientNotificationModel(id_code_client,dni_client)
    }

    static async updateTokenNotificationController(id_code_client,usuario_banca,token){
        return await ClientModel.updateTokenNotificationModel(id_code_client,usuario_banca,token)
    }

    static async updateProfileClientController(id_client,welcome,phone,email)
    {
        return await ClientModel.updateProfileClientModel(id_client,welcome,phone,email)
    }

    static async updateDataInfoLoginController(id_code_client,usuario_banca,imei,ip){
        return await ClientModel.updateDataInfoLoginModel(id_code_client,usuario_banca,imei,ip)
    }

    static async readCajaClientController(id_code_client,cod_oficina){
        return await ClientModel.readCajaClientModel(id_code_client,cod_oficina)
    }
}

module.exports = ClientController