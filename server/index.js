const express = require('express');
const morgan = require('morgan');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Connect to the database
connectDB();

app.get('/', (req, res, next) => {
  res.json({
    message: 'done',
  });
});

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`App listening on port ${port}.`));
