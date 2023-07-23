// System/ Third Party imports
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swStats = require('swagger-stats');
const expressWinston = require('express-winston');
const winston = require('winston'); 
const passport = require('passport')
const cookieSession = require("cookie-session");
const cors = require("cors");
const { createBullBoard } = require('@bull-board/api');
const { ExpressAdapter } = require('@bull-board/express');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');

const passportSetup = require('./passport')
require('dotenv').config()

// Project imports
const swaggerDocument = require('./openapi.json');
const verifyJWT = require('./middleware/verifyJWT')
const setupMQ = require('./interfaces/jobs/command/createMQ')

// Express setup
const app = express();
app.use(express.json());

// CORS for UI
app.use(cors())
app.use(
	cors(
    {
    origin: '*',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    }
  )
);

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Compliant
  next();
});

// Setting up bull-board
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/bull-board');

const mqs = setupMQ()

let bMQAdapters = []
for(let key in mqs){
  bMQAdapters.push(new BullMQAdapter(mqs[key]))
}


createBullBoard({
  queues: bMQAdapters,
  serverAdapter,
});

app.use('/bull-board', serverAdapter.getRouter());

// Settingup session cookies
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.enable("trust proxy");

app.use(passport.initialize());
app.use(passport.session());



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
  res.json({ message: 'Welcome to Kurunagai API.', docs:'/api-docs',stats:'/swagger-stats', batchJobs:'/bull-board' });
});


app.get("/api-docs/swagger.json", (req, res) => {
  res.json(swaggerDocument);
});

// Serve Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Registration and Auth API
app.use('/api/register', require('./routes/register.routes'));
app.use('/api/google/auth', require('./routes/google.auth.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

//Serve tempfiles for batch job
app.use('/tempfiles', express.static('./storage/uploads'));

// Protectect API
app.use(verifyJWT)

// Protected APIs
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/subscriptions', require('./routes/subscriptions.routes'));
app.use('/api/payments', require('./routes/payments.routes'));
app.use('/api/invoices', require('./routes/invoices.routes'));
app.use('/api/invites', require('./routes/invites.routes'));
app.use('/api/photos', require('./routes/photos.routes'));
app.use('/api/upload', require('./routes/upload.routes'));


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
app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on port ' + process.env.PORT || '8080' );
});
