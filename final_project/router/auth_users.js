const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if the provided username exists in the 'users' array
  if (!isValid(username)) {
    return res.status(401).json({ message: "Invalid username" });
  }

  // Authenticate the user based on username and password
  if (authenticatedUser(username, password)) {
    // If authentication succeeds, generate a JWT token
    const token = jwt.sign({ username }, "123"); // Replace 'your-secret-key' with a secret key

    // Return the JWT token as a response
    return res.status(200).json({ message: "Login successful", token });
  } else {
    // If authentication fails, return an error message
    return res.status(401).json({ message: "Invalid password" });
  }

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  // const token = req.header.authenticated;

  // jwt.verify(token, "your-secret-key", (err, decode) => {
  //   if (err) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }
  //   const username = decode.username;

  //   const isbn = req.params.isbn;

  //   const reviewText = req.query.review;

  //   if (!reviewText) {
  //     return res.status(400).json({ message: "Review text is required" });
  //   }

  //   const book = books[isbn];

  //   if (!book) {
  //     return res.status(404).json({ message: "Book not found" });
  //   }

  //   if (!book.review) {
  //     book.reviewas = {};
  //   }

  //   book.reviews[username] = reviewText;

  //   return res.status(200).json({ message: "Review added" });
  // });
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
