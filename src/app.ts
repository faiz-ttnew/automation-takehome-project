import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import productRoute from './routes/product.route'

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/prod', productRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
