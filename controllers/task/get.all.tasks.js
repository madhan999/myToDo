const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = async (req, res, next) => {
    try {
        let userId = req.user.id;
        let user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                tasks: true
            }
        })
        return res.send({tasks: user.tasks})
    } catch (error) {
        return res.send(error.message)
    }
}