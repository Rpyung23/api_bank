const InvestmentModel = require('../model/investment.model')
class InvestmentController {
    static async readInvestmentController(codeclient){
        return await InvestmentModel.readInvestmentModel(codeclient)
    }
}

module.exports = InvestmentController