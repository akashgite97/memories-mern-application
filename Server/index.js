import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import postRoutes from './routes/post.js';
import dotenv from 'dotenv'
import userRoutes from './routes/user.js'

const app = express();
dotenv.config()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//Routes
app.use('/posts', postRoutes);
app.use('/user',userRoutes)

//middlewares
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//DB connection
mongoose.connect(process.env.DB_URL,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,}, () =>
  console.log('DB connectd successfully')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started successfully on ${PORT}`);
});
