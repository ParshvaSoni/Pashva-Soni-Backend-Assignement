"use strict";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

import productRouter from "./Routes/productRoutes.js";

const options = {
  definition: {
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "Pashva Soni INeuron Assignement",
      description: "By this project, I would like to showcase my skills in Backend REST-Full API Development.",
      version: "1.0.0",
      contact: {
        name: "Pashva Soni",
        email: "soniparshva4@gmail.com",
        url: "http://parshvasoni.netlify.app/",
      },
    },
    servers:[{
      url:'http://localhost:3000/',
      description:'Local Server'
    }]
  },
  apis:['./Routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
dotenv.config()
const app = express()

// Visit http://localhost:3000/api-docs For Swagger Docs 

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(cookieParser());
app.use(bodyParser.json()); // parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // you can parse incoming Request Object if object, with nested objects, or generally any type.


// Setting up cors
var corsOption = {
  origin: '*', // for now use * but in production allow only specified origin to pass (react-admin.com)
  methods: 'GET,HEAD,PATCH,POST,DELETE,PUT',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));



mongoose.connect("mongodb://localhost/PSAssignment")
const db = mongoose.connection
db.on('error', (error) => { console.error(error) })
db.once('open', () => console.log("connected to DB")) // this runs when db is connected 

// list all the routes here,
app.use('/products', productRouter); // product route

// page not found error handling  middleware
app.use("*", (req, res) => {
  res.status(404).json({ success: 0, message: "We didn't find what you are looking for !", data: null });
});

app.listen(3000, () => { console.log("server started at port")})