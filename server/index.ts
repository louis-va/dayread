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
import database from './src/models';
import authRoutes from './src/routes/auth.route'
import postRoutes from './src/routes/post.route'
import userRoutes from './src/routes/user.route'
import { useJwtStrategy } from './src/middlewares/passport';
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
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
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
if (env.ENV !== 'test') app.use(morgan('combined'));

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
app.use('/post', postRoutes);
app.use('/user', userRoutes);

// Set port, listen for requests
const server = app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});

export { app, server };