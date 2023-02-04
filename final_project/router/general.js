const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) {
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registred. Now you can login" });
      } else {
        return res.status(404).json({ message: "User already exists!" });
      }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    books.getBooks().then( result =>
        res.status(200).send(result)
    )
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn
    books.getBookbyID(isbn).then(function(result) {
        if (result){
            res.status(200).send(result)
        }else{
            res.status(404).json({message: `Book with isbn ${isbn} not found`});
        }
    }
    ).catch(err => res.status(500).send(err));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author
    books.getBookbyAuthor(author).then(function(result) {
        if (result.length > 0){
            res.status(200).send(result)
        }else{
            res.status(404).json({message: `Book with author ${author} not found`})
        }
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title
    books.getBookbyTitle(title).then(function(result) {
        if (result.length > 0){
            res.status(200).send(result)
        }else{
            res.status(404).json({message: `Book with title ${title} not found`})
        }
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn
    let book = books[isbn]
    if (book){
        return res.status(200).send(JSON.stringify(book.reviews,null,4))
    }else{
        return res.status(404).json({message: `Book with isbn ${isbn} not found`});
    }
});

module.exports.general = public_users;