const express = require("express")
const server = express()
const cors = require("cors")
const reviewProducts = require("./src/reviews/index.js") //12) we import our reviews router
server.use(express.json())
server.use(cors())
const port = 4000

server.listen(port, () => {
    console.log(`We are running on localhost ${port}`)
})
server.use("/reviews", reviewProducts) // 13)we assign the reviewRouter on /review // 14) check it on POSTMAN GET http://localhost:4000/reviews