const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = express.Router();
const mongoose = require('mongoose');
const config = require('./config');
const PORT =  4000;

const csvRoutes = require('./routes/csv.routes');

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

mongoose.connect(`mongodb://${config.connection.host}:${config.connection.port}/${config.connection.dbname}`, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// stablish csv csvRoutes
csvRoutes(app, routes);

app.listen(PORT, () => console.log('server is running on port ' + PORT));
