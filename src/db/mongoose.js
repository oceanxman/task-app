const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {

})



// const clothes = new Task({
//     desc: 'fold clothes',
//     completed: false
// })
//
// clothes.save().then(() => {
//     console.log(clothes)
// }).catch((error) => {
//     console.log(error)
// })



// const me = new User({
//     name: '   Ethan    ',
//     age: 24,
//     email: 'kru.hzzz@gmail.com',
//     password: 'pass1word'
// })
//
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })