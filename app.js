// System/ Thirs Party imports
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swStats = require('swagger-stats');
const expressWinston = require('express-winston');
const winston = require('winston'); 
require('newrelic');

// Project imports
const swaggerDocument = require('./openapi.json');

// Express setup
const app = express();
app.use(express.json());


// DB Migrations
const db = require("./models");
db.sequelize.sync({force:true})
// db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Setup Logger
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

// Serve Swagger Stats
app.use(swStats.getMiddleware({swaggerSpec:swaggerDocument}));

// Serve Root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kurunagai API." });
});


app.get("/api-docs/swagger.json", (req, res) => {
  res.json(swaggerDocument);
});

// Serve Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve API
app.use('/api/users', require('./routes/users'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/invites', require('./routes/invites'));

// Setup error Logger
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

// Start App
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
