const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
require('../db/mongoose')






router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
        //console.log(e)
    }


})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/me', auth, async (req, res) => {

    try {
        //console.log(req.user)
        res.send(req.user)


    } catch (e) {

        res.status(500).send()
    }

})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }


})


router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Invalid Updates')
    }
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        updates.forEach((update) => user[update] = req.body[update])

        console.log(user)
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send()

        }
        res.send(user)
    } catch (e) {
        res.send(500)
    }
})


module.exports = router