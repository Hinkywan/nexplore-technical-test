import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/CustomError';

// Global error handler
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Log the error to the console

    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;