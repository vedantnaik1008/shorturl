import express from 'express'
import { router as urlRouter } from './routes/url.js'
import { connectMongoDb } from './connection.js';
import {router as staticRouter} from './routes/staticRouter.js'
import { router as userRouter } from './routes/user.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import { checkAuthentication, restrictTo } from './middlewares/auth.js';

const app = express()
const PORT = 8001;

connectMongoDb(
    'mongodb+srv://vedantnaik:jaibhavani@cluster0.zx6emy1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);

app.set('view engine', "ejs") //ssr by using ejs
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(checkAuthentication)

app.use('/url', restrictTo(["NORMAL"]), urlRouter)
app.use('/', urlRouter);
app.use('/user', userRouter)
app.use('/static', staticRouter);

app.listen(PORT, ()=> console.log('backend connected'))