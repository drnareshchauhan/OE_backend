var UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//create admin
var createadmin = () => {
  bcrypt
    .hash("", saltRounds)
    .then((hash) => {
      var tempdata = new UserModel({
        name: "naresh",
        password: hash,
        emailid: "drnareshchauhan@rediffmail.com",
        contact: "8160395020",
        type: "ADMIN",
      });
      tempdata
        .save()
        .then(() => {
          console.log("user created");
        })
        .catch((err) => {
          console.log("err1", err);
        });
    })
    .catch((err) => {
      console.log("err2", err);
    });
};

var hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        resolve(hash);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { createadmin, hashPassword };
