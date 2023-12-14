const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const constants = require("../../utils/constants")
const jwt = require('jsonwebtoken');
const {comparePassword, hashPassword} = require('../../utils/bcrypt')
const _ = require('lodash');

module.exports = async (req, res, next) => {
    try {
        let userBody = req.body.user;
        
        //check if email already exists
        let count = await prisma.user.count({
            where:{
                email: userBody.email
            }
        })
        if (count == 0) throw new Error(constants.errors.invalidLoginCredentials)
        
        //check user
        let user = await prisma.user.findFirst({
            where: {
                email: userBody.email
            }
        })
        //check password
        const hashedPassword = await hashPassword(userBody.password)
        if (await comparePassword(hashedPassword, user.password)) {
            user = _.omit(user, 'password')
            const token = jwt.sign(user, process.env.JWTSECRETKEY, {expiresIn: '24h'})
            res.send({user, token})
        }
    } catch (error) {
        console.log("Error", error);
        return res.send(error.message)
    }
}