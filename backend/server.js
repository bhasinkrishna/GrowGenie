const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const path = require("path"); 
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers like Content-Type and Authorization
  })
);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/usergallery", express.static(path.join(__dirname, "usergallery")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/form", formRoutes);
app.use("/api", authRoutes);
app.use('/upload', uploadRoutes);
// DB Connect & Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
