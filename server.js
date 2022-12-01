const express = require("express");
const { log } = require("mercedlogger"); // import mercedlogger's log function
const app = express();

require("./app/startup/startup")(app);

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT = 3000} = process.env
app.get("/", (req, res) => {
    res.send("welcome to water testing");
})
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`));
