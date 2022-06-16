const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //get the token form the headers object
    const token = req.header('auth-token')

    //if No token
    if(!token) {
        return res.json('Access denied!!')
    }

    //if we have a token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded);

        next()
    } catch (error) {
        console.log(error);
        res.status(400).json('Token not valid')
    }
}