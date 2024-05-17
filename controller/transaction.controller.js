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

    static async createTransactionClientExternalController(cod_empresa,cod_oficina,cod_caja,cli_empresa,cli_ofici,cod_clien,
                                                      dni_client,
                                                      nombre_clien,account_origin,valtrans,id_clien_dest,name_clien_dest,
                                                      codofi,account_des,type_account,detail)
    {
        return await TransactionModel.createTransactionClientExternalModel(cod_empresa,cod_oficina,cod_caja,cli_empresa,
            cli_ofici,cod_clien, dni_client, nombre_clien,account_origin,valtrans,id_clien_dest,name_clien_dest,
            codofi,account_des,type_account,detail)
    }
}

module.exports = TransactionController