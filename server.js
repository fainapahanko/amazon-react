const express = require("express")
const server = express()
const cors = require("cors")
server.use(express.json())
server.use(cors())
const port = 4000

server.listen(port, () => {
    console.log(`We are running on localhost ${port}`)
})