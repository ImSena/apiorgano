import { PrismaClient } from "@prisma/client";

class Collaborator {
    constructor(id) {
        this.prisma = new PrismaClient();
        this.id_user = id;
    }

    create = async (name, cargo, id_team, url_image) => {
        try {
            const team = await this.prisma.team.findFirst({
                where: {
                    id_team,
                    id_user: this.id_user
                }
            })

            if (!team) {
                throw new Error("Team is not exists");
            }

            await this.prisma.collaborator.create({
                data:{
                    name,
                    cargo,
                    url_image,
                    team:{
                        connect:{id_team}
                    }
                }
            })
        } catch (error) {
            throw new Error(error.message);
        }
    }

    read = async (id_team) => {
        try{
            const collaborators = await this.prisma.collaborator.findMany({
                where:{
                    team:{
                        id_team,
                        id_user: this.id_user
                    }
                }
            })

            return collaborators;
        }catch(error){
            throw new Error(error.message);
        }
    }

    update = async (id_collaborator, name, cargo, url_image) => {
        try{
            const data = {}

            if(name) data.name = name;
            if(cargo) data.cargo = cargo;
            if(url_image) data.url_image = url_image;

            if(Object.keys(data).length === 0)
            {
                throw new Error("No data provided for update");
            }

            const collaborator = await this.prisma.collaborator.findFirst({
                where:{
                    id_collaborator,
                    team:{id_user: this.id_user}
                }
            });

            if(!collaborator) throw new Error("Collaborator is not exists");  

            await this.prisma.collaborator.update({
                where:{id_collaborator},
                data
            })
        }catch(error){
            throw new Error(error.message);
        }
    }

    delete = async (id_collaborator) => {
        try{
            const collaborator = await this.prisma.collaborator.findFirst({
                where:{
                    id_collaborator,
                    team:{id_user: this.id_user}
                }
            });

            if(!collaborator) throw new Error("Collaborator is not exists");

            await this.prisma.collaborator.delete({
                where:{
                    id_collaborator
                }
            })
        }catch(error){
            throw new Error(error.message);
        }
    }
}

export default Collaborator;