const BankcreditModel = require('../model/bankcredit.model')
class BankcreditController {
    static async readBankCreditController(id_client){
        return await BankcreditModel.readBankCreditModel(id_client)
    }

    static async readDetailBankCreditController(id_credit){
        return await BankcreditModel.readDetailBankCreditModel(id_credit)
    }
}

module.exports = BankcreditController