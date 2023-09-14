const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cookieParser = require("cookie-parser")



const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(cookieParser())

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
    cookie:{secure:false},
  })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  //Write the authenication mechanism here

  const token = req.session.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "123");

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

const PORT = 5000;

const public_users = require("./router/general.js").general;
app.use("/public_users", public_users);


app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
