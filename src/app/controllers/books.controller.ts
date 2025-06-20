import express, { NextFunction, Request, Response } from 'express'
import { Book } from '../models/books.model'

export const booksRouter = express.Router()

booksRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payLoad = req.body

        const book = await Book.create(payLoad)

        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            "data": book
        })
    } catch (error) {
        next(error)
    }
})

booksRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await Book.find().limit(10)

        res.status(201).json({
            "success": true,
            "message": "Books retrieved successfully",
            "data": books
        })
    } catch (error) {
        next(error)
    }
})