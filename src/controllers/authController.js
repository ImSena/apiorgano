import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { sendResetPass } from '../services/emailService.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const UserModel = new User(null);
        const user = await UserModel.login(email, password);
        const token = jwt.sign({ userId: user.id_user }, process.env.SECRET_KEY, { expiresIn: '3h' });

        return res.status(200).json({ auth: true, token });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const sendLinkResetPassword = async (req, res) => {
    try{
        const { email } = req.body;

        const UserModel = new User(null);

        const user = await UserModel.read(email);

        const token = jwt.sign({userId: user.id_user}, process.env.SECRET_KEY, {expiresIn: '10m'});

        const link = `http://localhost:3000/resetPassword?token=${token}`;

        await sendResetPass(user.email, link)

        res.status(200).json({message:'Redefinição de senha enviada para o email'})

    }catch(error){
        return res.status(400).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) =>{
    const id_user = req.userId;
    const {password} = req.body;
    try{
        const UserModel = new User(id_user);
        UserModel.changePassword(password);
        res.status(200).json({message: "Senha alterada com sucesso!"});
    }catch(error){
        return res.status(400).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.end();
}