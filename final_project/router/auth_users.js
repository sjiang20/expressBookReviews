const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { username: "user1", password: "12345" },
  { username: "user2", password: "54321" },
];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  return users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  return users.some(
    (user) => user.username === username && user.password === password
  );
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
    res.status(401).json({ message: "Invalid password" });
  }

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  const token = req.header("Authorization");
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenValue = token.split(" ")[1];

  jwt.verify(token, "123", (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });

  const username = decode.username;
  const isbn = req.params.isbn;
  const reviewText = req.query.review;

  if (!reviewText) {
    return res.status(400).json({ message: "Review text is required" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (books[isbn].reviews[username]) {
    books[isbn].reviews[username] = reviewText;
  } else {
    books[isbn].reviews[username] = reviewText;
  }
  res.status(200).json({ message: "Review added/modified" });

  return res.status(300).json({ message: "Yet to be implemented" });
});


// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  // Get the token from the session
  const token = req.session.accessToken;

  // Verify the token to get the username
  jwt.verify(token, "123", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const username = decoded.username;
    const isbn = req.params.isbn;

    // Check if the book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the user has posted a review for this book
    if (!books[isbn].reviews || !books[isbn].reviews[username]) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Delete the user's review for this book
    delete books[isbn].reviews[username];

    res.status(200).json({ message: "Review deleted" });
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
