const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'))
app.get("/", (req,res) => {
    res.send(path.join(__dirname, "/public/index.html"))
})

app.listen(port, () => {
    console.log("Listening on port 3000")
})
