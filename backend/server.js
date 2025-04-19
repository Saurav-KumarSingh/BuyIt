const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv");
const db=require("./config/db")
const userRoute=require("./routes/userRoutes");
const productRoute=require("./routes/productRoutes");
const cartRoute=require("./routes/cartRoutes");
const checkoutRoute=require("./routes/checkoutRoutes");
const orderRoute=require("./routes/orderRoutes");
const uploadRoute=require("./routes/uploadRoutes");
const subscribeRoute=require("./routes/subscribeRoute");
const adminRoute=require("./routes/adminRoute");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config(); 

const PORT = process.env.PORT || 9000;

db();

app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT API!");
});

// API routes 

app.use('/api/users/',userRoute);
app.use('/api/products/',productRoute);
app.use('/api/cart/',cartRoute);
app.use('/api/checkout/',checkoutRoute);
app.use('/api/orders/',orderRoute);
app.use('/api/upload/',uploadRoute);
app.use('/api/subscribe/',subscribeRoute);


// Admin routes
app.use('/api/admin/users/',adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});