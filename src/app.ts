import express, { Application, NextFunction, Request, Response } from 'express'
import { booksRouter } from './app/controllers/books.controller'
import { borrowsRouter } from './app/controllers/borrows.controller'

const app: Application = express()

app.use(express.json())
app.use('/api/books', booksRouter)
app.use('/api/borrow', borrowsRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    if (err.name === 'ValidationError') {
        // delete err.errors?.copies?.properties?.path;
        // delete err.errors?.copies?.properties?.value;
        res.status(400).json({
            "message": "Validation failed",
            "success": false,
            "error": {
                name: err.name,
                errors: err.errors
            }
        })
    }
    else {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: err.message
        })
    }
})

export default app