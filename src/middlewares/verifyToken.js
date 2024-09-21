import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extrai o token

    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token has expired" });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            }
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = decoded.userId;
        next();
    });
};