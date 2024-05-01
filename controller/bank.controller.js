const BankModel = require('../model/bank.model')
class BankController {
    static async readListBankActiveController(){
        return await BankModel.readListBankActiveModel()
    }
}

module.exports = BankController