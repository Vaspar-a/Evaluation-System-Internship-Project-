const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");

const Student = require('./../models/students');

const studentRouter = express.Router();

studentRouter.use(bodyParser.json());
studentRouter.use(bodyParser.urlencoded({ extended: true })); 

studentRouter.options("/", cors.cors);

studentRouter
  .route("/:documentId")
  .get(cors.cors, (req, res, next) => {
    console.log("GET on /student");
    
    Student.findById(req.params.documentId)
    .then((student) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
      }, (err) => next(err))
      .catch((err) => {
        console.log(err);
      });
    
  })
  .post(cors.cors, (req, res, next) => {
    console.log("POST on /student" + req.params.documentId);

    Student.findByIdAndRemove(req.params.documentId)
    .then((student) => {
      console.log('Removed!');
    }, (err) => next(err))
    .catch((err) => {
      console.log(err);
    });

    Student.create(req.body)
    .then((student) => {
      console.log('Student Created');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(student);
    }, (err) => next(err))
    .catch((err) => {
      console.log(err);
    });

  });

module.exports = studentRouter;