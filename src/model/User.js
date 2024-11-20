import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

class User
{
    id = null;

    constructor(id)
    {
        this.id = id;
    }

    async create(name, dt_birth, email, password)
    {
        try{

            const existedUser = await prisma.user.findUnique({
                where: {
                    email:email
                }
            })

            if(existedUser){
                throw new Error("Usuário já existe!");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.create({
                data:{
                    name,
                    dt_birth: new Date(dt_birth),
                    email,
                    password: hashedPassword
                }
            })
        }catch(error){
            throw new Error(error.message);
        }
    }

    async login(email, password)
    {
        try{
            const user = await prisma.user.findUnique({
                where:{
                    email: email
                }
            })

            if(!user){
                throw new Error("Usuário não encontrado");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!isPasswordValid){
                throw new Error("Senha ou usuário incorretas");
            }

            return user;

        }catch(error){
            throw new Error(error.message);
        }
    }

    async read(email)
    {
        try{
            const user = await prisma.user.findUnique({
                where:{
                    email: email
                }
            })

            if(!user){
                throw new Error("Usuário não encontrado");
            }

            return user;

        }catch(error){
            throw new Error(error.message);
        }
    }

    async changePassword(password){
        try{
            const hashedPassword = await bcrypt.hash(password, 10);
    
            await prisma.user.update({
                where:{
                    id_user: this.id
                },
                data:{
                    password: hashedPassword
                }
            })

        }catch(error){
            throw new Error(error.message)
        }
    }
}

export default User; 