const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");

const Admin = require('./../models/admin');

const subjectRouter = express.Router();

subjectRouter.use(bodyParser.json());
subjectRouter.use(bodyParser.urlencoded({ extended: true })); 

subjectRouter.options("/", cors.cors);

subjectRouter
  .route("/:email")
  .get(cors.cors, (req, res, next) => {
    console.log("GET on /subject");
    
    Admin.find({email: req.params.email})
    .then((subject) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(subject);
      }, (err) => next(err))
      .catch((err) => {
        console.log(err);
      });

  });

module.exports = subjectRouter;
