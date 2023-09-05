const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

class ExpressLoader {
  static init() {
    const app = express();

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(cookieParser());
    app.use(cors());
    app.use(helmet());
    app.use(hpp());
    app.use(mongoSanitize());
    // app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
    app.use(morgan("short"));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use("/uploads/image", express.static("uploads/image"));

    // app.disable("trust proxy");
    app.use(express.json());
    return app;
  }
}

module.exports = { ExpressLoader };
