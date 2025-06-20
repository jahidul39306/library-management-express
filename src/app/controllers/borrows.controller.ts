import express from 'express'
import { Book } from '../models/books.model'
import { Borrow } from '../models/borrows.model'

export const borrowsRouter = express.Router()

borrowsRouter.post('/', async (req, res, next) => {
    try {
        const payLoad = req.body

        const bookId = req.body.book
        const book = await Book.findById(bookId)

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
            return
        }

        if (book.copies < payLoad.quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough books available'
            });
            return
        }
        const newQuantity = book.copies - payLoad.quantity
        const result = Book.updateBook(bookId, newQuantity)

        if (!result) {
            res.status(400).json({
                success: false,
                message: 'Failed to update the book quantity or available'
            });
            return
        }
        const borrow = await Borrow.create(payLoad)

        res.status(201).json({
            "success": true,
            "message": "Book borrowed successfully",
            "data": borrow
        })

    } catch (error) {
        next(error)
    }
})