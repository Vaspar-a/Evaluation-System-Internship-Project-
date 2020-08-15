const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");

const Admin = require("./../models/admin");

const adminRouter = express.Router();

adminRouter.use(bodyParser.json());
adminRouter.use(bodyParser.urlencoded({ extended: true }));

adminRouter.options("/", cors.cors);

adminRouter
  .route("/")
  .get(cors.cors, (req, res, next) => {
    console.log("GET on /admin");
    //console.log("Req body");

    Admin.find()
      .then(
        (admin) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(admin);
        },
        (err) => next(err)
      )
      .catch((err) => {
        console.log(err);
      });
  })
  .post(cors.cors, (req, res, next) => {
    console.log("POST on /admin");
    //console.log(req.body.admin);

    Admin.deleteMany()
      .then(
        (data) => //console.log(data),
        (err) => next(err)
      )
      .catch((err) => {
        console.log(err);
      });

    Admin.insertMany(req.body.admin)
      .then(
        (admin) => {
          console.log("Admin Created");
          //console.log(admin);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(admin);
        },
        (err) => next(err)
      )
      .catch((err) => {
        console.log(err);
      });
  });

adminRouter.route("/:documentId")
.get(cors.cors, (req, res, next) => {
  console.log("GET on /admin");
  //console.log("Req body");
  let data = req.params.documentId.split("_");
  //console.log(data);
  const obj = {
    college: data[0],
    branch: data[1],
    semester: data[2],
  };
  
  Admin.find(obj)
    .then(
      (admin) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(admin);
      },
      (err) => next(err)
    )
    .catch((err) => {
      console.log(err);
    });
});

module.exports = adminRouter;
