const TransactionModel =  require('../model/transaction.model')
class TransactionController
{
    static async readLastTransactionClientController(num_account){
        return await TransactionModel.readLastTransactionClientModel(num_account)
    }

    static async createTransactionCLientLocalController(cod_empresa,codoficina,codcajas,detail,
                                                        account_origin,account_destination,valtrans)
    {
        return await TransactionModel.createTransactionCLientLocalModel(cod_empresa,codoficina,codcajas,detail,
            account_origin,account_destination,valtrans)
    }
    static async readTransactionLocalClientController(num_account,code_transaction){
        return await TransactionModel.readTransactionLocalClientModel(num_account,code_transaction)
    }
}

module.exports = TransactionController