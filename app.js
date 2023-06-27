const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const swStats = require('swagger-stats');

app.use(express.json());

const db = require("./models");

db.sequelize.sync({force:true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Serve Root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kurunagai API." });
});

// Serve Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test Results
app.get('/tests',function(req,res){
  res.sendFile(path.join(__dirname+'tests/result/index.html'));
});

// Serve Swagger Stats
app.use(swStats.getMiddleware({swaggerSpec:swaggerDocument}));

app.use('/api/users', require('./routes/users'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/invites', require('./routes/invites'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
