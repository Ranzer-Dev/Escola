const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

function Converter(type, temperature) {
  let newTemp;
  switch (type.toUpperCase()) {
    case "C":
      newTemp = (9 * temperature) / 5 + 32;
      break;

    case "F":
      newTemp = (5 * (temperature - 32)) / 9;
      break;

    default:
      newTemp = 0;
      break;
  }
  return newTemp;
}

app.post("/temperature", (req, res) => {
  const { type, temperature } = req.body;

  if (!type || temperature === undefined) {
    return res
      .status(400)
      .send("Erro: parâmetros 'type' e 'temperature' são obrigatórios.");
  }

  const newTemperature = Converter(type, temperature);
  res.send(`New Temperature: ${newTemperature}`);
});

const veiculos = [{id: 1, nome:"fiat"},{id: 2, nome:"Celta"},{id: 3, nome:"Maria"}]

app.put('/', (req, res) => {
  const index = veiculos.findIndex(veiculo => veiculo.id == req.query.id);
  veiculos[index] = {id: req.query.id, nome: req.body}
  res.send(JSON.stringify(veiculos))
})

app.delete('/', (req,res) => {
  const index = veiculos.findIndex(veiculo => veiculo.id == req.query.id);
  veiculos.splice(index, 1);
  res.send(JSON.stringify(veiculos))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});