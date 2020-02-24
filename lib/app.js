const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./routes/user'));
app.use('/api/v1/group', require('./routes/group'));
app.use('/api/v1/dev', require('./routes/dev'));
app.use('/api/v1/callback', require('./routes/callback'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
