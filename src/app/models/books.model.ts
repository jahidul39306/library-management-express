import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

const bookSchema = new Schema<IBooks>({
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

export const Book = model<IBooks>("Books", bookSchema)