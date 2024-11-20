import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/apiRoutes.js'
import cors from 'cors';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

app.use('/api', apiRoutes);

app.listen(PORT, ()=>{
    console.log('ta rodando');
})