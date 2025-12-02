//Intializing Server
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose"); //import mongoose
require("dotenv").config(); //import dotenv
const { DB_URI, SECRET_KEY } = process.env; //grab database URI + secret key
const cors = require("cors"); //For disabling default browser security
const Contact = require("./models/contact"); //importing the contact schema
const User = require("./models/user"); //importing the user schema
const bcrypt = require("bcrypt"); //for hashing passwords
const jwt = require("jsonwebtoken"); //for signing JWT tokens

//Middleware
server.use(express.json()); //ensure JSON body can be read
server.use(express.urlencoded({ extended: true })); //URL encoded parsing
server.use(cors());

// JWT AUTH MIDDLEWARE
function authMiddleware(request, response, next) {
  const token = request.headers["authorization"]; //get token from request headers

  // If token missing → block access
  if (!token) {
    return response.status(401).send({ message: "Not Authorized: Token missing" });
  }

  try {
    // Remove the word "Bearer " and verify real JWT token
    const actualToken = token.split(" ")[1];
    const decoded = jwt.verify(actualToken, SECRET_KEY);

    // Save decoded user info so routes can use it if needed
    request.user = decoded;

    next(); //allow access to route
  } catch (error) {
    return response.status(403).send({ message: "Invalid or expired token" });
  }
}

// DATABASE CONNECTION
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Database is connected\nServer is listening on ${port}`);
      console.log(new Date(Date.now()));
    });
  })
  .catch((error) => console.log(error.message));


// ROOT ROUTE
server.get("/", (request, response) => {
  response.send("Server is Live!");
});


// USER REGISTER ROUTE
server.post("/register", async (request, response) => {
  const { username, password } = request.body;

  try {
    // user password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user in DB in contact/users collection
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    response.send({ message: "User Created!" });
  } catch (error) {
    response.status(500).send({
      message: "User Already Exists, please find another username",
    });
  }
});


// USER LOGIN ROUTE
server.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).send({ message: "User does not exist" });
    }

    // Compare password with stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return response.status(403).send({
        message: "Incorrect username or password",
      });
    }

    // create JWT token
    const jwtToken = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY
    );

    return response.status(201).send({
      message: "User Authenticated",
      token: jwtToken,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// CONTACT ROUTES 

// To GET all contacts
server.get("/contacts", authMiddleware, async (request, response) => {
  try {
    const contacts = await Contact.find();
    response.send(contacts);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// To POST a new contact
server.post("/contacts", authMiddleware, async (request, response) => {
  const { name, email, address, phone, image } = request.body;

  const newContact = new Contact({
    name,
    contact: {
      email,
      address,
      phone,
    },
    image,
  });

  try {
    await newContact.save();
    response.status(200).send({
      message: `Contact is added successfully!`,
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// To DELETE a contact by its id
server.delete("/contacts/:id", authMiddleware, async (request, response) => {
  const { id } = request.params;
  try {
    await Contact.findByIdAndDelete(id);
    response.send({
      message: `Contact is deleted`,
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// To GET one contact by id
server.get("/contacts/:id", authMiddleware, async (request, response) => {
  const { id } = request.params;
  try {
    const contactToEdit = await Contact.findById(id);
    response.send(contactToEdit);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// To PATCH a contact by id
server.patch("/contacts/:id", authMiddleware, async (request, response) => {
  const { id } = request.params;
  const { name, phone, address, email, image } = request.body;

  try {
    await Contact.findByIdAndUpdate(id, {
      name,
      contact: { email, address, phone },
      image,
    });

    response.send({
      message: `Contact has been updated`,
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
