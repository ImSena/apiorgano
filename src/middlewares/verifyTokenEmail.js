import jwt from "jsonwebtoken";

export const verifyTokenEmail = (req, res, next)=>
{
    const {token} = req.query;
    
    if(!token){
        return res.status(401).json({message: "No have token to authenticate"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token has expired" });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            }
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.token = token;
        req.userId = decoded.userId;
        next();
    })

}