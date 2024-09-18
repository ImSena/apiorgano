import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/apiRoutes.js'

dotenv.config();


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api', apiRoutes)

app.listen(PORT, ()=>{
    console.log('ta rodando');
})