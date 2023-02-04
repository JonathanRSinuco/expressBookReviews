const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password)
        });
        if (validusers.length > 0) {
            return true;
        } else {
            return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(404).json({ message: "Error logging in" });
    }
  
    if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign({
        data: username
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken, username
      }
      return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn
    let book = books[isbn]
    if (book) {
        let reviewsArray = Object.values(book.reviews)
        let thisreview = req.query.review
        if (thisreview){
            let review = reviewsArray.filter((review) => review.username === req.user.data)
            var data = {
                username : req.user.data,
                review : thisreview
            }
            if (review.length > 0){
                review = reviewsArray.filter((review) => review.username != req.user.data)
                review.push(data)
                book.reviews = {...review}

            }else{
                reviewsArray.push(data)
                book.reviews = {...reviewsArray}
            }

        }
        return res.status(200).send(JSON.stringify(book.reviews, null, 4))
    } else {
      return res.status(404).json({ message: `Book with isbn ${isbn} not found` });
    }
});

regd_users.delete("/auth/review/:isbn",(req, res) => {
    let isbn = req.params.isbn
    let book = books[isbn]
    if (book) {
        let reviewsArray = Object.values(book.reviews)
        let review = reviewsArray.filter((review) => review.username === req.user.data)
        if (review.length > 0){
            review = reviewsArray.filter((review) => review.username != req.user.data)
            book.reviews = {...review}
        }else{
            return res.status(404).json({ message: `Book with isbn ${isbn} and username ${req.user.data} not found` });
        }
        return res.status(200).send(JSON.stringify(book.reviews, null, 4))
    } else {
        return res.status(404).json({ message: `Book with isbn ${isbn} not found` });
    }
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
