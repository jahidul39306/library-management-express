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
        let filter = {}
        let books = {}
        const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 10;

        if (req.query.filter) {
            filter = { genre: req.query.filter }
        }
        if (req.query.sortBy && req.query.sort) {
            const key: any = req.query.sortBy
            const order = req.query.sort === 'desc' ? -1 : 1
            books = await Book.find(filter).sort({ [key]: order }).limit(limit)
        } else {
            books = await Book.find(filter).limit(limit)
        }

        res.status(202).json({
            "success": true,
            "message": "Books retrieved successfully",
            "data": books
        })
    } catch (error) {
        next(error)
    }
})

booksRouter.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        const book = await Book.findById(bookId)

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
            return
        }

        res.status(202).json({
            "success": true,
            "message": "Book retrieved successfully",
            "data": book
        })
    } catch (error) {
        next(error)
    }
})

booksRouter.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        const updatedBook = req.body
        const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true, runValidators: true })

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
            return
        }

        res.status(202).json({
            "success": true,
            "message": "Book updated successfully",
            "data": book
        })
    } catch (error) {
        next(error)
    }
})

booksRouter.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId
        const book = await Book.findByIdAndDelete(bookId)

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
            return
        }

        res.status(200).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
        })
    } catch (error) {
        next(error)
    }
})