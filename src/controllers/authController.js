import jwt from 'jsonwebtoken';
import User from '../model/User.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const UserModel = new User(null);
        const user = await UserModel.read(email, password);
        const token = jwt.sign({ userId: user.id_user}, process.env.SECRET_KEY, { expiresIn: '3h' })

        return res.status(200).json({ auth: true, token });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.end();
}