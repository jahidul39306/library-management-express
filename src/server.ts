import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';


const app = express()
dotenv.config()
const port = process.env.PORT
const db_uri = process.env.DATABASE_URI!

app.get('/', (req, res) => {
    res.send('Hello World!')
})

async function main() {
    try {
        await mongoose.connect(db_uri);
        console.log('connected to mongodb')
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    } catch (error) {
        console.log(error);
    }
}
main()

