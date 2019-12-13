const express = require("express")
const server = express()
const cors = require("cors")
const reviewProducts = require("./src/reviews/index.js") //12) we import our reviews router
server.use(express.json())
const listEndpoints = require("express-list-endpoints")
const productsRouter = require("./src/products/index")
const reviewsRouter = require("./src/reviews/index")
server.use(cors())
const port = 4000
const filerouter = require("./src/uploads/")


server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)

server.listen(port, () => {
    console.log(listEndpoints(server))
    console.log(`We are running on localhost ${port}`)
})

server.use("/reviews", reviewProducts) // 13)we assign the reviewRouter on /review // 14) check it on POSTMAN GET http://localhost:4000/reviews

server.use("/images" ,filerouter);

