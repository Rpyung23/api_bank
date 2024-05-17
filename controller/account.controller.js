const AccountModel = require('../model/account.model')
class AccountController
{
    static async readAccountClientController(id_client)
    {
        return await AccountModel.readAccountClientModel(id_client)
    }

    static async readtypeAccountModel(){
        return await AccountModel.readtypeAccountModel()
    }
}

module.exports = AccountController