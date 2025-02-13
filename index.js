const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.MONGO_URL;

// * Routes
const bookRoutes = require("./src/books/bookRoute");
const orderRoutes = require("./src/orders/orderRoute");
const userRoutes = require("./src/users/userRoute");
const adminRoutes = require("./src/stats/adminStats");

// * Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-store-frontend-phi-five.vercel.app",
    ],
    credentials: true,
  })
);

main()
  .then((res) => console.log(`Connected to DB`))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Book Store Server is Running!");
});

app.listen(port, () => {
  console.log(`App is listening on port : ${port}`);
});
