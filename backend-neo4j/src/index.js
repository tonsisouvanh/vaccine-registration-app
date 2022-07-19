const express = require("express");
const dotenv = require("dotenv");

const userRoute = require("./routes/userRoute.js");
const vaccineRoute = require("./routes/vaccineRoute.js");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/vaccines", vaccineRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  console.log("server is listenning to 8800");
});
