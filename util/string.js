var eliminarCaracteresEspeciales = (cadena) => {
    // Define una expresión regular que coincide con los caracteres especiales
    var regex = /[^\w\s]/gi; // Coincide con cualquier cosa que no sea alfanumérica o un espacio en blanco
    // Reemplaza los caracteres especiales con una cadena vacía
    return cadena.replace(regex, '');
}



module.exports = {eliminarCaracteresEspeciales}