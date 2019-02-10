const port = 3030

const bodyParse = require('body-parser')
const express = require('express')
const server = express()
const cors = require('./cors')

server.use(bodyParse.urlencoded({extended: true}))
server.use(bodyParse.json())
server.use(cors)

server.listen(port, ()=>{
    console.log(`server e-commerce in run, port: ${port}`)
})

module.exports = server