
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});
// define a extensao do nunjucks
app.set('view engine', 'njk');
// define o caminho de onde as views serao salvas
app.set('views', path.join(__dirname, 'views'));

moment().format();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const { body: { nome, dtNasc } } = req;

  if (nome === '' || dtNasc === '') {
    res.redirect('/');
  }
  console.log(`data-nasc: ${dtNasc}, nome: ${nome}`);
  const idade = moment().diff(moment(dtNasc, 'DD/MM/YYYY'), 'years');
  console.log(`idade: ${idade}`);
  if (idade >= 18) {
    res.redirect(`/major?nome=${nome}`);
  } else {
    res.redirect(`/minor?nome=${nome}`);
  }
});

app.get('/major', (req, res) => {
  const { query: { nome } } = req;
  // const { nome } = req.query.nome;
  console.log(nome);
  // console.log(`nome: ${nome}, dtNasc: ${dtNasc}`);
  res.render('major', { nome });
});

app.get('/minor', (req, res) => {
  const { query: { nome } } = req;
  // const nome = req.body.nome;
  // const { body: { nome } } = req;
  res.render('minor', { nome });
});

app.listen(3000);
