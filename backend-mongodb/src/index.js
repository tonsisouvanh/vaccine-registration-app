// const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
const cors = require("cors");

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/vaccines", require("./routes/vaccineRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/centers", require("./routes/centerRoutes"));

app.use("/api/vaccine-registration", require("./routes/registrationRoutes"));

app.use("/api/carts", require("./routes/cartRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
