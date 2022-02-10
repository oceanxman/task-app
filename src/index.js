const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site currently closed, come back later')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const bycrypt = require('bcryptjs')
// const myFunction = async () => {
//     const password = '12345Red!'
//     const hashedPassword = await bycrypt.hash(password, 8)
//
//     console.log(password)
//     console.log(hashedPassword)
//
//     const isMatch = await bycrypt.compare('12345Red!', hashedPassword)
//     console.log(isMatch)
// }
// myFunction()

// const jwt = require('jsonwebtoken')
//
// const myFuntion = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thismyproject', { expiresIn: '5 seconds' })
//     console.log(token)
//
//     const data = jwt.verify(token, 'thismyproject')
//     console.log(data)
// }
//
// myFuntion()