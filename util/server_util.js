const os = require('os');

let getServerIP =  ()=> {
    const interfaces = os.networkInterfaces();
    for (let interfaceName in interfaces) {
        const addresses = interfaces[interfaceName];
        for (let i = 0; i < addresses.length; i++) {
            const addressInfo = addresses[i];
            if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
                return addressInfo.address;
            }
        }
    }
    return 'IP no encontrada';
}

module.exports = {getServerIP}