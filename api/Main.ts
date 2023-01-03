import "dotenv/config";
import Express from 'express';

const app = Express();

// basic security
import helmet from "helmet";
app.use(helmet());
app.use(Express.json({strict: true, type: "application/json"}));

// cors
import CORS from "cors";
app.use(CORS({
  origin: ["https://prodigal.13373333.one", "https://13373333.one"]
}))

// OK
app.get("/", (_, res) => {
  return res.sendStatus(200);
});

// file storage
import FileStorage from "./routes/FileStorage";
app.use("/file", FileStorage);

const PORT = +process.env.API_PORT!;
app.listen(PORT, () => {
  console.log("API Connected with port ", PORT);
});