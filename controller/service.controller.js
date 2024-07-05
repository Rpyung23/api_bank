const ServiceModel = require('../model/service.model')
class ServiceController
{
    static async readTypeServiceController()
    {
        return await ServiceModel.readTypeServiceModel()
    }

    static async readServiceController(typeService)
    {
        return await ServiceModel.readServiceModel(typeService)
    }
}

module.exports = ServiceController