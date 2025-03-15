
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import appRouter from './routers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(helmet()); 
app.use(morgan('dev'));

app.use("/api/v1/auth",appRouter )

export default app;











/**
 * The `app.use()` method is used to mount middleware functions in an Express application.
 * Middleware functions are executed sequentially whenever a request is received by the server.
 * They can perform various tasks such as logging, parsing request bodies, handling authentication,
 * or modifying the request/response objects.
 *
 * Example usage:
 * ```typescript
 * app.use((req, res, next) => {
 *   console.log('Middleware executed');
 *   next(); // Pass control to the next middleware or route handler
 * });
 * ```
 *
 * In this file, `app.use()` is currently empty and needs to be configured with middleware functions
 * to handle specific tasks for incoming requests.
 */

// Morgan is a logging middleware for Node.js that helps you keep track of HTTP requests made to your server. It logs details like request method (GET, POST), URL, response status, and time taken.

