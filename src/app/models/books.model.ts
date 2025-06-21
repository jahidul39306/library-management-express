import { model, Schema } from "mongoose";
import { BooksStaticMethods, IBooks } from "../interfaces/books.interface";
import { Borrow } from "./borrows.model";

const bookSchema = new Schema<IBooks, BooksStaticMethods>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: '{VALUE} is not supported genre'
        },
        required: true,
        uppercase: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'isbn must be unique, the provided isbn is already in use'],
        trim: true
    },
    description: { type: String, trim: true },
    copies: {
        type: Number,
        min: [0, 'copies cannot be negative number'],
        required: true
    },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
})

bookSchema.static('updateBook', async function (bookId, newQuantity) {
    let book
    if (newQuantity === 0) {
        book = await this.findByIdAndUpdate(bookId, { available: false, copies: newQuantity }, { new: true, runValidators: true })
    } else {
        book = await this.findByIdAndUpdate(bookId, { copies: newQuantity }, { new: true, runValidators: true })
    }
    if (book) {
        return true
    }
    return false
})

bookSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Borrow.deleteMany({ book: doc._id })
    }
})
export const Book = model<IBooks, BooksStaticMethods>("Books", bookSchema)