require('dotenv').config()
const htmlLogin = (ip_access,date_access)=>{
    return `<table style="border-collapse: collapse!important; margin: 0; padding: 0;" border="0" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="background-position: top center; background-repeat: no-repeat; margin: 0; padding: 0;" valign="top" bgcolor="#F8F7F9">
<div>
<table style="border-collapse: collapse!important; box-sizing: border-box; margin: auto; max-width: 600px!important; text-align: left; width: 100%!important;" width="600" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td style="padding: 20px 0 20px 10px;" align="left" valign="bottom"><img class="m_3656326453254082807banco_guayaquil_fullcolor CToWUd" style="border: 0; height: 90px; line-height: 100%; outline: none; text-decoration: none; width: 180px;" src="${process.env.FOTOURLCOOP}" data-bit="iit" /></td>
</tr>
</tbody>
</table>
<table style="background-color: #ffffff; box-sizing: border-box; margin: auto; text-align: left; border-radius: 20px; overflow: hidden; border: 1px solid #f3f3f5; max-width: 600px !important; width: 100%; height: 340px;" width="600" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr style="height: 340px;">
<td style="padding-bottom: 40px; padding-top: 40px; text-align: left; height: 340px;" bgcolor="#FFFFFF">
<table class="m_3656326453254082807inner" style="border-collapse: collapse!important; box-sizing: border-box; margin: auto; max-width: 540px!important;" width="540" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td style="padding: 0 20px; text-align: left;" align="left">
<h1 style="color: #160f41; font-size: 24px; font-weight: bold; line-height: 1.2; margin: 0; padding-bottom: 10px; width: 100%!important;">Ingreso a la Banca Virtual M&oacute;vil</h1>
<div style="color: #333333; font-size: 18px; letter-spacing: 0; line-height: 1.5;">
<p>Te detallamos tu ingreso:</p>
</div>
<div style="height: 20px;">&nbsp;</div>
<table style="width: 100%!important; margin: 0; text-align: left; border-radius: 20px; overflow: hidden; background-color: #f8f7f9;" width="100%" cellspacing="0" align="left">
<tbody>
<tr>
<td style="text-align: left; padding: 40px 20px;">
<h4 style="color: #8a869f; font-size: 16px; font-weight: normal; margin: 0 0 5px;">Fecha</h4>
<p style="color: #333; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 0 20px;">${date_access}</p>
<h4 style="color: #8a869f; font-size: 16px; font-weight: normal; margin: 0 0 5px;">Direcci&oacute;n de m&aacute;quina</h4>
<p style="color: #333; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 0 20px;">${ip_access}</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<div>
<div class="h5">
<div style="height: 20px;">&nbsp;</div>
<table style="border-collapse: collapse!important; box-sizing: border-box; margin: auto; margin-bottom: 20px; max-width: 100%; text-align: center; width: 100%;" width="100%" cellspacing="0" align="center">
<tbody>
<tr>
<td>
<table class="m_3656326453254082807inner" style="border-collapse: collapse!important; box-sizing: border-box; margin: auto; max-width: 100%; width: 100%;">
<tbody>
<tr>
<td>
<table class="m_3656326453254082807inner" style="border-collapse: collapse!important; box-sizing: border-box; margin: auto; max-width: 540px!important; width: 100%!important;" width="540" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td style="padding: 0 20px; text-align: left;" align="left">
<p style="color: #8a869f; font-size: 14px; font-weight: bold;"><img class="CToWUd" style="vertical-align: middle;" src="https://ci3.googleusercontent.com/meips/ADKq_Nan_q3UybPyZ7ixoJHr8gWTzM0LwvZbPk7vewo8MmxV8Bx0XxFu8ZRH6Is_8LcVmjveeuQGxmd6tiL47njpFEv7fuIzLoVAlM7rrYf8Gw=s0-d-e1-ft#https://www.bancoguayaquil.com/documents/images/lock.png" width="18" height="18" data-bit="iit" />Seguridad</p>
<p style="color: #8a869f; font-size: 14px;">Te recordamos que ${process.env.NAMECOOP} nunca te solicitar&aacute;, ni por correo electr&oacute;nico ni en formularios, datos confidenciales como contrase&ntilde;as o n&uacute;meros secretos.</p>
<p style="color: #8a869f; font-size: 14px;">Este correo fue enviado de forma autom&aacute;tica y no requiere respuesta.</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</td>
</tr>
</tbody>
</table>`;
}

module.exports = {htmlLogin}