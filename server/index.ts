// Import dependencies
import express, { Express, Request, Response, NextFunction } from 'express';
import { ConnectOptions } from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Import routes, models & configs
import database from './models';
import authRoutes from './routes/auth.route'
import { useJwtStrategy } from './config/passport';
import env from './env.config'

// Initialise express
const app: Express = express();

// Define, configure and serve Swagger/OpenAPI
const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dayread API',
      version: '1.0.0',
      description: 'API of the Dayread app.',
    },
    servers: [
      {
        url: 'http://localhost:8000', // Your server URL
      },
    ],
  },
  apis: ['./routes/*.ts'], // Path to your API routes files
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Enhance API security
app.use(helmet());

// Allow requests from multiple origins
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8000"],
  credentials: true
}));

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Stores session data on the client within a cookie
app.use(
  cookieSession({
    name: "session",
    keys: [env.COOKIE_SECRET],
    httpOnly: true,
    sameSite: (env.ENV === 'production') ? "none" : "strict",
    secure: env.ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  })
);

// Set response headers
app.use(function(req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

// Log HTTP requests
app.use(morgan('combined'));

// Connection to the database
database.mongoose
  .connect(env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => {
      console.log("Successfully connect to MongoDB.");
  })
  .catch((err: Error) => {
      console.error("Connection error", err);
      process.exit(1);
  });

// Initialize passport
app.use(passport.initialize());
useJwtStrategy()

// Routes
app.use('/auth', authRoutes);

// Set port, listen for requests
app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});

export default app;