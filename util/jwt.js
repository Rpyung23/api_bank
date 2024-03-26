require('dotenv').config()
const jsonwebtoken = require('jsonwebtoken')

class Jwt {
    static createJWT(data)
    {
        try {
            var token = jsonwebtoken.sign({code_usu_banca:data.pk_usuario_banca,code_id_client:data.clien_cod_clien,code_dni_client:data.clien_ide_clien},process.env.CLAVE_TOKEN,{expiresIn:'31 days',algorithm:'HS256'})
            return token
        }catch (e) {
            return e.toString()
        }
    }

    static async checkJwt(req, res, next)
    {
        var token = req.headers["x-access-token"] || req.headers['authorization'] //req.headers["x-access-token"]
        try {
            //console.log(token)
            var decoded = await jsonwebtoken.verify(token.split(' ')[1], process.env.CLAVE_TOKEN)
            req.body.code_usu_banca = decoded.code_usu_banca.trim()
            req.body.code_id_client = decoded.code_id_client
            req.body.code_dni_client = decoded.code_dni_client.trim()
            return next();
        }catch (e) {
            res.status(401).json({msm:e.toString()})
        }
    }
}

module.exports = Jwt