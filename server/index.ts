export {};
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const cors        = require('cors');
const routes      = require('./routes/index');
const AuthService = require('./services/auth.service');

const host = '127.0.0.1';
const port = 3000;

app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AuthService.checkToken);

app.use('/api', routes);

app.listen(port, host, () => console.log(`Example app listening  http://${host}:${port}`));

