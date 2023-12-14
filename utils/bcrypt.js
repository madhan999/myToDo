const bcrypt = require('bcrypt');
const constants = require('./constants') 

const saltRounds = 15;

const hashPassword = async (password) => {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return passwordHash
}

const comparePassword = async (data, encrypted) => {
    const passwordMatch = await bcrypt.compare(data, encrypted);
    
    if (passwordMatch) {
        throw new Error(constants.errors.invalidLoginCredentials)
    }
    return true
}

module.exports = {
    hashPassword,
    comparePassword
}