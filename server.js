const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const pastaVideos = path.join(__dirname, "videos");
if (!fs.existsSync(pastaVideos)) {
  fs.mkdirSync(pastaVideos);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pastaVideos),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

app.post("/upload", upload.single("video"), (req, res) => {
  res.json({ mensagem: "Video salvo!", arquivo: req.file.filename });
});

app.get("/listar-videos", (req, res) => {
  const arquivos = fs.readdirSync(pastaVideos);
  res.json(arquivos);
});

app.use("/videos", express.static(pastaVideos));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
