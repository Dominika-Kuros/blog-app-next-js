import "dotenv/config";
import express from "express";
import blogPostRoutes from "./routes/blog-posts";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use("/uploads/featured-images", express.static("uploads/featured-images"));

app.use("/posts", blogPostRoutes);

export default app;