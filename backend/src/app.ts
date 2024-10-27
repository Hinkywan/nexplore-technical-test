import express, { Express, Request, Response } from 'express';
import dutyRoutes from './routes/dutyRoutes';

const app: Express = express();
app.use(express.json());
const port = 3000;

app.use('/api', dutyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});