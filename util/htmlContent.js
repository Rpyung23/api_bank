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

const htmlTransfer = (name_origin,account_origin,valtrans,name_dest,account_dest,detail,code_transfer) => {
    return `<div class=""><div class="aHl"></div><div id=":n9" tabindex="-1"></div><div id=":mz" class="ii gt" jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc5OTE3MTc3MjYzMDc4NjU4NyJd; 4:WyIjbXNnLWY6MTc5OTE3MTc3MjYzMDc4NjU4NyJd"><div id=":my" class="a3s aiL "><u></u><div><form name="m_-1470801680893433048_form1" method="post"  id="m_-1470801680893433048form1" target="_blank"><div id="m_-1470801680893433048content" style="width:98%;border:#000 thin solid"><table cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="center"><img id="m_-1470801680893433048Image2" height="50" src="${process.env.FOTOURLCOOP}" align="middle" style="border-width:0" class="CToWUd" data-bit="iit"></td></tr><tr><td align="center"><span id="m_-1470801680893433048lblComprobante" style="font-weight:700">Comprobante de Transferencia</span><br><span id="m_-1470801680893433048lblBancaVirtual" style="font-weight:700">Banca Móvil Personas</span><br><span id="m_-1470801680893433048lblComprobanteNo" style="font-weight:700">Comprobante No.</span><span id="m_-1470801680893433048lblNumeroComprobante" style="font-weight:700">${code_transfer}</span></td></tr></tbody></table><br><hr style="width:90%;height:2px;background-color:#bc157c"><div style="width:100%;text-align:center"><div style="width:90%;margin-left:auto;margin-right:auto;text-align:left"><table border="0" width="100%"><tbody><tr><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblDatosdelOrdenante" style="font-weight:700">Datos del Ordenante</span></td><td></td></tr><tr><td colspan="2" style="height:10px"></td></tr><tr id="m_-1470801680893433048fila_NombreDeLaCuetaO"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblNombreDeLaCuetaO" style="font-weight:700">Titular Cuenta:</span></td><td style="font-size:12pt;font-family:Times New Roman"><span id="m_-1470801680893433048txtNombreDeLaCuentaO">
            ${name_origin}</span></td></tr><tr id="m_-1470801680893433048fila_NumerodeCuentaO" style="font-size:12pt;font-family:Times New Roman"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblNumerodeCuentaO" style="font-weight:700">No. de Cuenta:</span></td><td style="font-size:12pt;font-family:Times New Roman"><span id="m_-1470801680893433048txtNumerodeCuentaO">${account_origin}</span></td></tr><tr id="m_-1470801680893433048fila_TipoCuentaOrdenante" style="font-size:12pt;font-family:Times New Roman"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblTipoCuentaO" style="font-weight:700"></span></td><td style="font-size:12pt;font-family:Times New Roman"><span id="m_-1470801680893433048txtTipoCuentaO"></span></td></tr><tr style="font-size:12pt;font-family:Times New Roman"><td colspan="2" style="height:10px"></td></tr><tr style="font-size:12pt;font-family:Times New Roman"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblDatosBeneficiario" style="font-weight:700">Datos del Beneficiario</span></td><td></td></tr><tr><td colspan="2" style="height:10px"></td></tr><tr id="m_-1470801680893433048fila_NombreDeLaCuentaB"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblNombreDeLaCuentaB" style="font-weight:700">Titular Cuenta:</span></td><td style="font-size:12pt;font-family:Times New Roman"><span id="m_-1470801680893433048txtNombreDeLaCuentaB">
            ${name_dest}</span></td></tr><tr id="m_-1470801680893433048fila_NumerodeCuentaB" style="font-size:12pt;font-family:Times New Roman"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblNumerodeCuentaB" style="font-weight:700">No. de Cuenta:</span></td><td style="font-size:12pt;font-family:Times New Roman"><span id="m_-1470801680893433048txtNumerodeCuentaB">${account_dest}</span></td></tr><tr id="m_-1470801680893433048fila_TipoCuentaB" style="font-size:12pt;font-family:Times New Roman"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblTipoCuentaB" style="font-weight:700"></span></td><td style="font-size:12pt;font-family:Times New Roman"><span id="m_-1470801680893433048txtTipoCuentaB"></span></td></tr><tr id="m_-1470801680893433048fila_Banco" style="font-size:12pt;font-family:Times New Roman"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblBanco" style="font-weight:700">Banco de la Cuenta:</span></td><td><span id="m_-1470801680893433048txtBanco">
            ${process.env.NAMECOOP}</span></td></tr><tr><td colspan="2" style="height:10px"></td></tr><tr><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblValorTransferidoUSD" style="font-weight:700">Valor Transferido:</span></td><td><span id="m_-1470801680893433048txtValorTransferidoUSD">$ ${valtrans}</span></td></tr><tr><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblValorComision" style="font-weight:700"></span></td><td><span id="m_-1470801680893433048txtValorComision"></span></td></tr><tr><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblTotalDebitado" style="font-weight:700"></span></td><td><span id="m_-1470801680893433048txtTotalDebitado"></span></td></tr><tr><td colspan="2" style="height:10px"></td></tr><tr><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblConcepto" style="font-weight:700">Concepto:</span></td><td><span id="m_-1470801680893433048txtConcepto">${detail}</span></td></tr><tr style="font-size:12pt;font-family:Times New Roman"><td colspan="2" style="height:10px"></td></tr><tr style="font-size:12pt;font-family:Times New Roman"><td style="width:200px;padding-left:20px"><span id="m_-1470801680893433048lblConcepto" style="font-weight:700"></span></td><td><span id="m_-1470801680893433048txtConcepto"></span></td></tr></tbody></table><table border="0" width="100%" style="font-size:12pt;font-family:Times New Roman"><tbody><tr><td colspan="2" style="padding-left:20px"><span id="m_-1470801680893433048lblBV" style="font-weight:700"><span id="m_-1470801680893433048Span1" style="font-weight:700"></span><span id="m_-1470801680893433048Span2" style="font-weight:700">
</span><span id="m_-1470801680893433048Span3" style="font-weight:700"></span><span id="m_-1470801680893433048Span4" style="font-weight:700"></span><span id="m_-1470801680893433048Span5" style="font-weight:700">Transacción exitosa</span></span></td></tr><tr><td colspan="2" style="height:10px"></td></tr><tr><td colspan="2" style="text-align:right"><div align="left" style="border:#000 1px solid;padding:7px"><span id="m_-1470801680893433048lblNota" style="font-weight:700"></span><br><span id="m_-1470801680893433048lblnote"></span></div></td></tr><tr><td colspan="2" style="text-align:right"><span id="m_-1470801680893433048lblTipoComprobante" style="font-weight:700">COPIA</span></td></tr></tbody></table></div></div><table cellspacing="0" border="0" width="100%"><tbody><tr><td style="background-color:#bc157c;height:10px"></td></tr></tbody></table></div></form></div></div><div class="yj6qo"></div><div class="yj6qo"></div></div><div class="WhmR8e" data-hash="0"></div></div>`;
}

module.exports = {htmlLogin,htmlTransfer}