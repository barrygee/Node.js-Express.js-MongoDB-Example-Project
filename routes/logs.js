const express = require('express')
const router = express.Router()
const Log = require('../models/log')

async function getLog(req, res, next) {
    let log

    try {
        log = await Log.findById(req.params.id)
        if(log == null) {
            return res.status(404).json({ message: 'Cannot find log'})
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }

    res.log = log

    next()
}

// Get all logs
router.get('/', async (req,res) => {
    try {
        const logs = await Log.find()
        res.send(logs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a single log
router.get('/:id', getLog, (req,res) => {
    res.json(res.log)
})


// Create a log
router.post('/', async (req,res) => {

    const values = { weekBeginning, 
                     subject, 
                     task, 
                     progress } = req.body

    const log = new Log(values)

    // save the new log to the database
    try {
        const newLog = await log.save()

        // status 201: successfully created an object
        res.status(201).json(newLog)

    } catch(error) {
        // client provided invalid data
        res.status(400).json({ message: error.message })
    }
})

/*
    - Update a log
    - patch only updates the values the user provides
    - put updates the entire object
*/
router.patch('/:id', getLog, async (req,res) => {
    /*
        - use the res.log object as the target object
        - use the req.body object as the new source 
        - update the res.log object with the values in req.body
        - update values with the same keys
    */
    res.log = Object.assign(res.log, req.body)

    /*
        save the updated object to the database 
    */
    try {
        const updatedLog = await res.log.save()
        res.json(updatedLog)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete a log
router.delete('/:id', getLog, async (req,res) => {
    try {
        await res.log.remove()
        res.json({ message: "Log deleted" })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router