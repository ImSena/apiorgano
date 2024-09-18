import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    })
}