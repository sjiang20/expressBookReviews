const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if(!username || !password){
    return res.status(400).json({message:"Username and password are required"});
  }

  const userExists = users.find((user) => user.username === username);

  if(userExists){
    return res.status(409).json({message:"Username already exists"});
  }

  const newUser = {
    username,
    password
  };

  users.push(newUser);

  res.status(201).json({message:"User registeration successful"});




  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  const bookList = books;

  const formattedBookList = JSON.stringify(bookList, null, 2);

  res.status(200).json(formattedBookList);

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here

  const author = req.params.author;

  const bookISBNs = Object.keys(books);

  const booksByAuthor = [];

  for (const isbn of bookISBNs) {
    const book = books[isbn];
    if (book.author === author) {
      booksByAuthor.push(book);
    }
  }

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "No books found by this author" });
  }
  res.status(200).json(booksByAuthor);

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here

  const title = req.params.title;

  const bookISBNs = Object.keys(books);

  const booksByTitle = [];

  for(const isbn of bookISBNs){
    const book = books[isbn];

    if (book.title.toLowerCase() === title.toLowerCase()){
      booksByTitle.push(book);
    }
  }

  if(booksByTitle.length === 0){
    return res.status(404).json({message:"No books found with this title"})
  }

  res.status(200).json(booksByTitle);




  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if(!book){
    return res.status(404).json({message:"Book not found"});
  }

  const reviews = book.reviews;

  if(!reviews || Object.keys(reviews).length === 0){
    return res.status(200).json({message:"No reviews available for this book"})
  }
  res.status(200).json(reviews);



  return res.status(300).json({ message: "Yet to be implemented" });
});




module.exports.general = public_users;
