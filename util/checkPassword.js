require('dotenv').config()
const bcrypt = require('bcryptjs');
let checkPassword = async (pass_into,pass_sql) =>
{
    await bcrypt.genSalt(parseInt(process.env.SALT_BCRYPT))
    console.log(await bcrypt.compare(pass_into,pass_sql))
    return await bcrypt.compare(pass_into,pass_sql)
}

module.exports = checkPassword