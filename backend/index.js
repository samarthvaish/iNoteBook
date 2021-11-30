const conectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

conectToMongo();

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`INoteBook app listening at http://localhost:${port}`);
});
