const express = require("express");

const app = express();

// create single endpoint for testing, and put in our callback with request response, to res.send which will just send data to the browser
app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} `));

// add some script to package.json, then use 'npm run server'
