const express = require('express');

const app = express();

app.use((req, res) => {
    res.send("Hello Rathan!!");
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});