import express, { Express, Request, Response } from 'express';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import cors from 'cors';

// Create a new express application instance
const app: Express = express();
const port = process.env.PORT || 5000;

// Parse the request body as JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Use routes
app.use('/api', routes);

// implement the global error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});