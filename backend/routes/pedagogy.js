const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");

const Pedagogy = require('./../models/Pedagogy');

const pedagogyRouter = express.Router();

pedagogyRouter.use(bodyParser.json());

pedagogyRouter
  .route("/:documentId")
  .get(cors.cors, (req, res, next) => {
    console.log("GET on /Pedagogy");
    
    Pedagogy.findById(req.params.documentId)
    .then((Pedagogy) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Pedagogy);
      }, (err) => next(err))
      .catch((err) => {
        console.log(err);
      });
    
  })
  .post(cors.cors, (req, res, next) => {
    console.log("POST on /Pedagogy" + req.params.documentId);

    Pedagogy.findByIdAndRemove(req.params.documentId)
    .then((Pedagogy) => {
      console.log('Removed!');
    }, (err) => next(err))
    .catch((err) => {
      console.log(err);
    });

    Pedagogy.create(req.body)
    .then((Pedagogy) => {
      console.log('Pedagogy Created');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(Pedagogy);
    }, (err) => next(err))
    .catch((err) => {
      console.log(err);
    });

  });

  module.exports = pedagogyRouter;