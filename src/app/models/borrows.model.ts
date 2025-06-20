import { model, Schema } from "mongoose"
import { IBorrows } from "../interfaces/borrows.interface"

const borrowsSchema = new Schema<IBorrows>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Books',
        required: true,
    },
    quantity: {
        type: Number,
        min: [1, 'Quantity must be atleast 1'],
        required: true
    },
    dueDate: {
        type: Date,
        required: true,

    }
}, {
    timestamps: true,
    versionKey: false
})

export const Borrow = model<IBorrows>("Borrows", borrowsSchema)