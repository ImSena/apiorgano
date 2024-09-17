import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;

const verifyJWT = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    })
}



app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.get('/collaborator', verifyJWT, (req, res)=>{
    res.json([{id: 1, nome: 'ImSena'}]);
})

app.post('/login', (req, res)=>{
    if(req.body.user === 'ImSena' && req.body.password === 123){
        const token = jwt.sign({userId: 1},process.env.SECRET_KEY, {expiresIn:'3h'})
        return res.json({auth: true, token});
    }

    res.status(401).end();
})

app.post('/logout', (req, res)=>{
    res.end();
})

app.listen(PORT, ()=>{
    console.log('ta rodando');
})