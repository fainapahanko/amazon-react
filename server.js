const express = require("express")
const server = express()
const cors = require("cors")
server.use(express.json())
const listEndpoints = require("express-list-endpoints")
const productsRouter = require("./src/products/index")
const reviewsRouter = require("./src/reviews/index")
server.use(cors())
const port = process.env.PORT || 3333
const filerouter = require("./src/uploads/")


server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)
server.use(express.static('./public/images'))

server.listen(port, () => {
    console.log(listEndpoints(server))
    console.log(`We are running on localhost ${port}`)
})

server.use("/images" ,filerouter);

