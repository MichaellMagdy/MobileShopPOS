const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require('./connection');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const db = require("./models");



//routers
const salesRouter = require('./routes/Sales');
app.use('/sales', salesRouter);
// db.sequelize.sync().then(() => {
// app.listen(3001, () => {
//     console.log('server runing on port 3001');
// });
app.listen(3001, () => {
    console.log('server runing on port 3001');
});

// });


