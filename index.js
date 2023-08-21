const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require("cors")



const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userRoute=require("./routes/users")

dotenv.config();
app.use(cors())

mongoose.connect(
  process.env.MONGO_URL
).then(()=>{
  console.log("Successfully Connected...")
}).catch((error)=>{
  console.log(error);
})

//middleware
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users",userRoute)

app.listen(4000, () => {
  console.log("Backend server is running on port 3000!");
});
