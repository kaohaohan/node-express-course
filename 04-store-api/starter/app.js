require("dotenv").config();
// async errors 用這個packege 來偵測error 
require('express-async-errors')


const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
//import error
const notFoundMiddleware = require("./middleware/not-found");
const errorFoundMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
//set the rounte for the product開api格式
app.use("/api/v1/products", productsRouter);
// products route

app.use(notFoundMiddleware);
app.use(errorFoundMiddleware);
//創一個port
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect DB
    console.log("process.env.MONGO_URI", process.env.MONGO_URI);
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
