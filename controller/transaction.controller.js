const TransactionModel =  require('../model/transaction.model')
class TransactionController
{
    static async readLastTransactionClientController(num_account){
        return await TransactionModel.readLastTransactionClientModel(num_account)
    }
}

module.exports = TransactionController