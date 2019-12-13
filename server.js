const express = require("express")
const server = express()
const cors = require("cors")
server.use(express.json())
const listEndpoints = require("express-list-endpoints")
const productsRouter = require("./src/products/index")
server.use(cors())
const port = 4000
const filerouter = require("./src/uploads/")


server.use("/products", productsRouter)

server.listen(port, () => {
    console.log(listEndpoints(server))
    console.log(`We are running on localhost ${port}`)
})
server.use("/images" ,filerouter);

