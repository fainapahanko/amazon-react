// 7) // The reviews.json file--> first should be an empty array []
const express = require("express")// 8) we need an express
const router = express.Router() // 9) we need a router "It will be the middleware that will take care for this route"
//15) to get reference to '{}reviews.json' we use 1)file sytem and 2)path
const fs = require("fs")
const path = require("path")

const reviewsPath = path.join(__dirname, "reviews.json");// 16)define Directory were the reviews should be stored

const readFile = () => { //17) create readfile function
    const buffer = fs.readFileSync(reviewsPath)// read the reviews path

    const content = buffer.toString();// convert to string
    return JSON.parse(content)// return json
}


router.get('/', (req,res)=>{ //18) Now writing the 'Get' method and calling the readFile() and check in POSTMAN http://localhost:4000/we get "[]"
const reviewsArray = readFile()
    res.send(reviewsArray)
})

//19) now writing POST method to allow creating new Reviews
router.post('/',(req,res)=>{ 

    var previousReviews = readFile(); //reads the reviews from the disk
    const review = {
        ...req.body,
        _id: previousReviews.length + 1,
    }// create object first and then push it to previous array of reviews

    previousReviews.push(review) //push the item into the reviews array
    fs.writeFileSync(reviewsPath, JSON.stringify(previousReviews)); //override the previous array on the harddrive
    res.send({ _id: review._id }) //return the newly generated ID as object{}
})

router.put("/:id", (req, res) =>{ //handle PUT /reviewss/:id
    let reviews = readFile(); //get all the reviews
    let review = reviews.find(x => x._id == req.params.id) //search for the review with the given ID
    if (review) //if not undefined!
    {
        let mergedReview = Object.assign(review, req.body) //copy the properties in req.body on review
        let position = reviews.indexOf(review) //students[req.params.id - 1] = mergedStudent
        reviews[position] = mergedReview //assign the student
        fs.writeFileSync(reviewsPath, JSON.stringify(reviews)); //override the students on disk
        res.send(mergedReview) //return the student
    }
    else
        res.status(404).send("Not found")
})


router.delete("/:id", (req, res)=>{ //handle DELETE on /students/:id
    let reviews = readFile();

    let reviewsToRemain = reviews.filter(x => x._id != req.params.id) //keeps only the elements with a different id
    if (reviewsToRemain.length < reviews.length){ //if the size of the arrays are different
        fs.writeFileSync(reviewsPath, JSON.stringify(reviewsToRemain)); //write it down
        res.send("Removed")
    }
    else
        res.status(404).send("Not found")
})



module.exports = router;// 10) Now we need to export the router