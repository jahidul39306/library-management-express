import dotenv from 'dotenv'
import mongoose from 'mongoose';
import app from './app';


dotenv.config()
const port = process.env.PORT
const db_uri = process.env.DATABASE_URI!


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

