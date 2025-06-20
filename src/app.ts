import express, { Application, NextFunction, Request, Response } from 'express'
import { booksRouter } from './app/controllers/books.controller'

const app: Application = express()

app.use(express.json())
app.use('/api/books', booksRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((err: any, req: Request, res: Response, next: NextFunction): any => {
    if (err.name === 'ValidationError') {
        // delete err.errors?.copies?.properties?.path;
        // delete err.errors?.copies?.properties?.value;
        return res.status(400).json({
            "message": "Validation failed",
            "success": false,
            "error": {
                name: err.name,
                errors: err.errors
            }
        })
    }

    res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: err.message
    })
})

export default app