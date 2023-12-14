const { PrismaClient } = require('@prisma/client')
const moment = require('moment');

const prisma = new PrismaClient()
const constants = require("../../utils/constants")
const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = async (req, res, next) => {
    try {
        let taskBody = req.body.task;
        //convert date to utc format
        const parsedDate = moment(taskBody.dueDate, 'MM-DD-YYYY');
        // Check if the parsed date is valid
        if (!parsedDate.isValid()) {
            throw new Error('Invalid date');
        }
        // console.log("Date", date);
        taskBody.dueDate = parsedDate.toISOString()
        let task = await prisma.task.create({
            data: {
                userId: req.user.id,
                ...taskBody
            }
        })
        return res.send({task})
    } catch (error) {
        console.log("Error", error);
        return res.send(error.message)
    }
}