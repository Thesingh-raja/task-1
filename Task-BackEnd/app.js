const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json())
app.use(cors({ origin: true }));
app.use(morgan('tiny'));

app.use('/api/v1/users', userRouter);

module.exports = app;
