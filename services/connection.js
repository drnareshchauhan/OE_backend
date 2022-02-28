var mongoose = require("mongoose");
require("dotenv").config();
var config = require("config");
let tool = require("./tool");

//database connection
mongoose.Promise = global.Promise;
const options = {
  autoIndex: false,
  reconnectTries: 100,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify: false,
};

mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
    //tool.createadmin();
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

module.exports = mongoose;