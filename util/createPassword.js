require('dotenv').config()
const bcrypt = require('bcryptjs');

let createPassword = async (passw) =>
{
    var salt = await bcrypt.genSalt(parseInt(process.env.SALT_BCRYPT))
    console.log(await bcrypt.hashSync(passw,salt))
    return await bcrypt.hashSync(passw,salt)
}

module.exports = createPassword