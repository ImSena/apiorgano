import { PrismaClient } from "@prisma/client";

class Team
{
    constructor(id_user){
        this.id_user = id_user;
        this.prisma = new PrismaClient();
    }

    async create(name){
        try{
            const existedTeam = await this.prisma.team.findFirst({
                where:{
                    name: name,
                    id_user: this.id_user
                }
            });

            if(existedTeam){
                throw new Error("Time já cadastrado");
            }

            await this.prisma.team.create({
                data:{
                    name,
                    user:{
                        connect: {id_user: this.id_user}
                    }
                }
            })
        }catch(error){
            throw new Error(error.message);
        }
    }

    async read(){
        try{
            const team = await this.prisma.team.findMany({
                where:{ id_user: this.id_user}
            });

            return team;
        }catch(error){
            throw new Error(error.message);
        }
    }

    async update(name, id_team){
        try{
            await this.prisma.team.update({
                where:{
                    id_team,
                    id_user: this.id_user
                },
                data:{
                    name
                }
            })
        }catch(error){
            throw new Error(error.message);
        }
    }

    async delete(id_team){
        try{
            await this.prisma.team.delete({
                where: {
                    id_user: this.id_user,
                    id_team
                }
            })
        }catch(error){
            throw new Error(error.message);   
        }
    }

    async readTeamWithCollaborator(id_team)
    {
        try{
            const teamWithCollaborator = await this.prisma.team.findMany({
                where:{
                    id_team,
                    id_user: this.id_user
                },
                include:{
                    collaborators: true
                }
            })

            return teamWithCollaborator;
        }catch(error){
            throw new Error(error.message);
        }
    }
}

export default Team;