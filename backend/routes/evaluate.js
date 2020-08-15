const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");

const Evaluate = require('./../models/evaluate');

const evaluateRouter = express.Router();

evaluateRouter.use(bodyParser.json());

evaluateRouter
  .route("/:documentId")
  .get(cors.cors, (req, res, next) => {
    console.log("GET on /evaluate");
    
    Evaluate.findById(req.params.documentId)
    .then((evaluate) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(evaluate);
      }, (err) => next(err))
      .catch((err) => {
        console.log(err);
      });
    
  })
  .post(cors.cors, (req, res, next) => {
    console.log("POST on /evaluate" + req.params.documentId);

    Evaluate.findByIdAndRemove(req.params.documentId)
    .then((evaluate) => {
      console.log('Removed!');
    }, (err) => next(err))
    .catch((err) => {
      console.log(err);
    });

    Evaluate.create(req.body)
    .then((evaluate) => {
      console.log('Evaluate Created');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(evaluate);
    }, (err) => next(err))
    .catch((err) => {
      console.log(err);
    });

  });

  module.exports = evaluateRouter;