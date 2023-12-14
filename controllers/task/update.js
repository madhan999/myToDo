const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require('moment');
module.exports = async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.taskId);
        let taskBody = req.body.task
        //convert date to utc format
        const parsedDate = moment(taskBody.dueDate, 'MM-DD-YYYY');
        // Check if the parsed date is valid
        if (!parsedDate.isValid()) {
            throw new Error('Invalid date');
        }
        // console.log("Date", date);
        taskBody.dueDate = parsedDate.toISOString()
        const task = await prisma.task.update({
            where: {
                id: taskId
            },
            data: taskBody
        })
        return res.send({task})
    } catch (error) {
        console.log("Error", error);
        return res.send(error.message)
    }
}