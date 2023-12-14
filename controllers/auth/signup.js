const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const constants = require("../../utils/constants")
const jwt = require('jsonwebtoken');
const {hashPassword, comparePassword} = require('../../utils/bcrypt')
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
        if (count > 0) throw new Error(constants.errors.emailExists)
        userBody.password = await hashPassword(userBody.password)
    comparePassword(userBody.password)
        let user = await prisma.user.create({
            data: userBody
        })
        user = _.omit(user, 'password')
        const token = jwt.sign(user, process.env.JWTSECRETKEY, {expiresIn: '24h'})
        res.send({user, token})
    } catch (error) {
        console.log("Error", error);
        return res.send(error.message)
    }
}