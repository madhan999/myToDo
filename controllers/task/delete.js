const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.taskId);
        await prisma.task.delete({
            where: {
                id: taskId
            }
        })
        return res.send({success: true})
    } catch (error) {
        console.log("Error", error);
        return res.send(error.message)
    }
}