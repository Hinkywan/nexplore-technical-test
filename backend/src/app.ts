import express, { Express, Request, Response } from 'express';
import dutyRoutes from './routes/dutyRoutes';
import errorHandler from './middlewares/errorHandler';

// Create a new express application instance
const app: Express = express();
const port = 3000;

// Parse the request body as JSON
app.use(express.json());

// implement the duty routes
app.use('/api', dutyRoutes);

// implement the global error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});