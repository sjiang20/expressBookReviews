const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const newUser = {
    username,
    password,
  };

  users.push(newUser);

  res.status(201).json({ message: "User registeration successful" });

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  const apiEndpoint = "http://http://localhost:5000/public_users";

  axios
    .get(apiEndpoint)
    .then((response) => {
      const booksFromAPI = response.data;

      res.status(200).json(booksFromAPI);
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });

  // const bookList = books;

  // const formattedBookList = JSON.stringify(bookList, null, 2);

  // res.status(200).json(formattedBookList);

  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  // Define the URL of the external API where book details can be fetched based on ISBN
  const apiEndpoint = `http://http://localhost:5000/public_users/${isbn}`; // Replace with the actual API endpoint

  // Make an asynchronous GET request to retrieve book details
  axios
    .get(apiEndpoint)
    .then((response) => {
      const bookDetails = response.data;

      // Check if the book exists
      if (!bookDetails) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Send the book details as a JSON response
      res.status(200).json(bookDetails);
    })
    .catch((error) => {
      console.error("Error fetching book details:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
  // const isbn = req.params.isbn;

  // const book = books[isbn];

  // if (!book) {
  //   return res.status(404).json({ message: "Book not found" });
  // }

  // res.status(200).json(book);

  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here

  const author = req.params.author;

  // Define the URL of the external API where book details can be fetched based on author
  const apiEndpoint = `http://http://localhost:5000/public_users?author=${author}`; // Replace with the actual API endpoint

  // Make an asynchronous GET request to retrieve book details
  axios
    .get(apiEndpoint)
    .then((response) => {
      const booksByAuthor = response.data;

      // Check if books by the author exist
      if (booksByAuthor.length === 0) {
        return res
          .status(404)
          .json({ message: "No books found by this author" });
      }

      // Send the books by the author as a JSON response
      res.status(200).json(booksByAuthor);
    })
    .catch((error) => {
      console.error("Error fetching books by author:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });

  // const author = req.params.author;

  // const bookISBNs = Object.keys(books);

  // const booksByAuthor = [];

  // for (const isbn of bookISBNs) {
  //   const book = books[isbn];
  //   if (book.author === author) {
  //     booksByAuthor.push(book);
  //   }
  // }

  // if (booksByAuthor.length === 0) {
  //   return res.status(404).json({ message: "No books found by this author" });
  // }
  // res.status(200).json(booksByAuthor);

  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here

  const title = req.params.title;

  // Define the URL of the external API where book details can be fetched based on title
  const apiEndpoint = `http://http://localhost:5000/public_users?title=${title}`; // Replace with the actual API endpoint

  // Make an asynchronous GET request to retrieve book details
  axios
    .get(apiEndpoint)
    .then((response) => {
      const booksByTitle = response.data;

      // Check if books with the title exist
      if (booksByTitle.length === 0) {
        return res
          .status(404)
          .json({ message: "No books found with this title" });
      }

      // Send the books with the title as a JSON response
      res.status(200).json(booksByTitle);
    })
    .catch((error) => {
      console.error("Error fetching books by title:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });

  // const title = req.params.title;

  // const bookISBNs = Object.keys(books);

  // const booksByTitle = [];

  // for (const isbn of bookISBNs) {
  //   const book = books[isbn];

  //   if (book.title.toLowerCase() === title.toLowerCase()) {
  //     booksByTitle.push(book);
  //   }
  // }

  // if (booksByTitle.length === 0) {
  //   return res.status(404).json({ message: "No books found with this title" });
  // }

  // res.status(200).json(booksByTitle);

  // return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const reviews = book.reviews;

  if (!reviews || Object.keys(reviews).length === 0) {
    return res
      .status(200)
      .json({ message: "No reviews available for this book" });
  }
  res.status(200).json(reviews);

  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
