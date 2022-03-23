const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/routes');
const cors = require('cors');
const { cryptoPrice } = require('./utils/utils');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
app.set('port', port);

app.use(morgan('dev'));
app.use(express.json());

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/', require('./routes/routes'));

app.use((_req, res, next) => {
  res.header();
  res.header();
  res.header();
  next();
});

app.use(
  cors({
    origin: (_origin, callback) => callback(null, true),
    methods: "GET, POST",
    credentials: true
  })
);

app.use(express.json({limit: '1mb'}));

app.use(express.urlencoded({limit: '1mb', extended: true}));

app.use('*', (_req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = "Pag no encontrada";
  return next(error);
});

app.use((error, _req, res, _next) => {
  return res.status(error.status || 500).json(error.message || 'Error no esperado');
});

app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${port}`);
});

app.disable('x-powerd-by');

setInterval(cryptoPrice, 60000);