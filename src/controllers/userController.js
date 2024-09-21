import User from "../model/User.js";

export const register = async (req, res)=>{
    const {name, dt_birth, email, password} = req.body;

    try{
        const UserModel = new User(null);

        await UserModel.create(name, dt_birth, email, password);

        return res.status(201).json({message: "User created success"});
    }catch(error){
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}