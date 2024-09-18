import jwt from 'jsonwebtoken';

export const login = (req, res)=>{
    if(req.body.user === 'ImSena' && req.body.password === 123){
        const token = jwt.sign({userId: 1},process.env.SECRET_KEY, {expiresIn:'3h'})
        return res.json({auth: true, token});
    }

    res.status(401).end();
}

export const logout = (req, res)=>{
    res.end();
}