import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import multer from "multer";
import fileUpload from "express-fileupload";
import * as url from "url";

import { config } from "./src/settings/config.js";
import { startConnection } from "./src/settings/database.js";

import { authRouter } from "./src/routes/auth.routes.js";
import { comentRouter } from "./src/routes/coment.routes.js";
import { postsRouter } from "./src/routes/post.routes.js";
import { validateToken } from "./src/middlewares/validate-token.js";
import { authHeader } from "./src/models/validations/auth-validation.js";

const app = express();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(fileUpload());

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "./src/images/" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

/* app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);
app.post("/upload", async (req, res) => {
  const file = req.files.image;
  await file.mv(path.join(__dirname, "uploads", file.name));
  res.sendStatus(200);
  console.log(req.files.image);
}); */

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
    console.log(req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.files.image;
  await file.mv(path.join(__dirname, "uploads")); 
  res.sendStatus(200).json("File has been uploaded");
}); */

app.use("/api/auth", authRouter);
app.use("/api/post", authHeader, validateToken, postsRouter);
app.use("/api/coments", authHeader, validateToken, comentRouter);

app.listen(config.port, async () => {
  await startConnection({ uri: config.mongo, database: config.database });
  console.log("Server is running on port: http://localhost:" + config.port);
});
