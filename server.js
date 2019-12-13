const express = require("express")
const server = express()
const cors = require("cors")
server.use(express.json())
const listEndpoints = require("express-list-endpoints")
const productsRouter = require("./src/products/index")
const reviewsRouter = require("./src/reviews/index")
server.use(cors())
const port = 4000

server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)

server.listen(port, () => {
    console.log(listEndpoints(server))
    console.log(`We are running on localhost ${port}`)
})

module.exports = server