import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
const __dirname = path.resolve();

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);


app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "build", "index.html"))
);

/*
app.get("/", (req, res) => {
  res.send("Hello Trae, welcome to NODE API");
});
*/

async function connectToMongoDB() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB using Mongoose");
      app.listen(port, () => console.log(`listening on port ${port}`));
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
connectToMongoDB();