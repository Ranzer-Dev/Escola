const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let nomes = []

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.post('/', (req, res) => {
    nomes.push(req.body.nome)
    res.send(req.body.nome)
})

app.listen(port ,()=> {
    console.log(`exempe app listem on port ${port}`)
})