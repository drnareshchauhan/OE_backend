const PORT = process.env.PORT || 5000;
var mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
const helmet = require("helmet");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
const expressValidator = require("express-validator");
var passport = require("./services/passportconf");
var tool = require("./services/tool");
var app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//run to create admin
//tool.createadmin();
app.use(helmet());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin"
  );
  next();
});

app.use(expressValidator());
//import other files

var admin = require("./routes/admin");
var login = require("./routes/login");
var user = require("./routes/user");
var universal = require("./routes/universal");
var question = require("./routes/questions");
var testpaper = require("./routes/testpaper");
var up = require("./routes/fileUpload");
var trainee = require("./routes/trainee");
var stopRegistration = require("./routes/stopRegistration");
var results = require("./routes/results");
var dummy = require("./routes/dummy");

//configs
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
//bind routes
app.use(
  "/api/v1/admin",
  passport.authenticate("user-token", { session: false }),
  admin
);
app.use(
  "/api/v1/user",
  passport.authenticate("user-token", { session: false }),
  user
);
app.use(
  "/api/v1/subject",
  passport.authenticate("user-token", { session: false }),
  universal
);
app.use(
  "/api/v1/questions",
  passport.authenticate("user-token", { session: false }),
  question
);
app.use(
  "/api/v1/test",
  passport.authenticate("user-token", { session: false }),
  testpaper
);
app.use(
  "/api/v1/upload",
  passport.authenticate("user-token", { session: false }),
  up
);
app.use(
  "/api/v1/trainer",
  passport.authenticate("user-token", { session: false }),
  stopRegistration
);
app.use("/api/v1/trainee", trainee);
app.use("/api/v1/final", results);
app.use("/api/v1/lala", dummy);

app.use("/api/v1/login", login);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//error handlings
app.use(function (req, res, next) {
  next(
    createError(
      404,
      "Invalid API. Use the official documentation to get the list of valid APIS."
    )
  );
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
});

// app.listen(PORT, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(`Server Started. Server listening to port ${PORT}`);
// });
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.dbURI, {
    autoIndex: false,
    reconnectTries: 100,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
