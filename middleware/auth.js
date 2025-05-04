const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Lee el token del header
    const token = req.header('Authorization');

    if(!token) return res.status(401).json({ message: 'Acceso denegado, token inexistente'});

    try {
        // Verifica el token con la clave
        const verified = jwt.verify(token, process.env.JWT_INV);
        // Guarda los datos del usuario en el request
        req.user = verified;
        next(); // Continuar con la ruta
    } catch (err) {
        // El token no coincide
        res.status(400).json({ message: 'Token invalido' });
    }
};