const express = require("express");
const app = express();
const getRoutes = require("./routes/getRoutes");
const PORT = 3001;

const ngrok = require("ngrok");

//middleware

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", getRoutes);

app.listen(PORT, () => {
  console.log("server listening on port");
});

(async function () {
  const url = await ngrok.connect({ proto: "http", addr: PORT, authtoken: "" });
  console.log(url);
})();
