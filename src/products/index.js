const fs = require("fs")
const path = require("path")
const express = require("express")
const multer = require("multer")
const { sanitize } = require("express-validator");
const router = express.Router()
var uniqid = require('uniqid');

const productsFile = path.join(__dirname,"products.json")

router.get("/",(req, res)=>{
    const productsArray = readFile()
    if(req.query && req.query.brand){
        const filteredArray = productsArray.filter(product => product.brand === req.query.brand)
        res.send(filteredArray)
    } else res.send(productsArray)
})

router.get("/:id",(req,res)=>{
    const productsArray = readFile()
    const product = productsArray.find(product => product._id === req.params.id)
    if(product) res.send(product)
})
const upload = multer()

router.post("/", upload.single("img"), async(req,res)=>{
    const productsArray = readFile()
    const obj = {
        ...req.body,
        _id: uniqid(),
        createdAt: new Date()
    }
    const imgDest = path.join(__dirname, "../../public/images/" + obj._id + ".jpg")
    await fs.writeFile(imgDest, req.file.buffer)
    obj.imageUrl = imgDest
    productsArray.push(obj)
    await fs.writeFile(productsFile, JSON.stringify(productsArray))
    res.send(productsArray)
})


router.put("/:id",(req,res)=>{
    const productsArray = readFile()
    const updated = {
        ...req.body,
        updatedAt: new Date(),
    }
    const product = productsArray.find(products => products._id === req.params.id)
    const position = productsArray.indexOf(product)
    productsArray[position] = updated
    fs.writeFileSync(productsFile, JSON.stringify(productsArray))
    res.send(productsArray)
})

router.delete("/:id",(req,res)=>{
    const productsArray = readFile()
    const filteredArray = productsArray.filter(product => product._id !== req.params.id)
    fs.writeFileSync(productsFile, JSON.stringify(filteredArray))
    res.send(filteredArray)
})

const readFile = () => {
    const buffer = fs.readFileSync(productsFile)
    const content = buffer.toString()
    return JSON.parse(content)
}


module.exports = router