const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

let alunos = [];

app.post("/", (req, res) => {
  const { ra, nome, turma } = req.body;
  alunos.push({ ra, nome, turma, cursos: [] });
  res.send(alunos);
});

app.post("/curso", (req, res) => {
  const { ra, curso } = req.body;
  const aluno = alunos.find(a => a.ra == ra);
  aluno.cursos.push(curso);
  res.send(alunos);
});

app.put("/", (req, res) => {
  const { ra, nome, turma } = req.body;
  const aluno = alunos.find(a => a.ra == ra);
  if (nome) aluno.nome = nome;
  if (turma) aluno.turma = turma;
  res.send(alunos);
});

app.put("/curso", (req, res) => {
  const { ra, antigo, novo } = req.body;
  const aluno = alunos.find(a => a.ra == ra);
  const i = aluno.cursos.indexOf(antigo);
  aluno.cursos[i] = novo;
  res.send(alunos);
});

app.delete("/", (req, res) => {
  const { ra } = req.body;
  alunos = alunos.filter(a => a.ra != ra);
  res.send(alunos);
});

app.delete("/curso", (req, res) => {
  const { ra, curso } = req.body;
  const aluno = alunos.find(a => a.ra == ra);
  aluno.cursos = aluno.cursos.filter(c => c != curso);
  res.send(alunos);
});

app.get("/", (req, res) => {
  res.send(alunos);
});

app.get("/aluno", (req, res) => {
  const { ra } = req.query;
  const aluno = alunos.find(a => a.ra == ra);
  res.send(aluno);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
