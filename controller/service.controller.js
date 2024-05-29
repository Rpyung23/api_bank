const ServiceModel = require('../model/service.model')
class ServiceController
{
    static async readTypeServiceController()
    {
        return await ServiceModel.readTypeServiceModel()
    }
}

module.exports = ServiceController