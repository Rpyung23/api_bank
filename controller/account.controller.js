const AccountModel = require('../model/account.model')
class AccountController
{
    static async readAccountClientController(id_client)
    {
        var data = await AccountModel.readAccountClientModel(id_client)
    }
}

module.exports = AccountController