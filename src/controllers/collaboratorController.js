import Collaborator from "../model/Collaborator.js";

export const createCollaborator = async (req, res) => {

    try {
        const { name, cargo, id_time, url_image } = req.body
        const id_user = req.userId;

        const datas = [name, cargo, id_time, url_image];

        datas.forEach((value) =>{
            if(value === undefined || value === null || value === ''){
                throw new Error("Params are undefined, null or not exists");   
            }
        })

        const CollaboratorModel = new Collaborator(id_user);

        await CollaboratorModel.create(name, cargo, id_time, url_image);

        return res.status(201).json({message: 'Collaborator created successfully'});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

export const getCollaborators = async (req, res) => {
    try{
        const id_user = req.userId;
        const {id_team} = req.body;

        const CollaboratorModel = new Collaborator(id_user);

        const collaboratos = await CollaboratorModel.read(id_team);

        return res.status(200).json(collaboratos);
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

export const updateCollaborator = async (req, res) => {
    try{
        const {id_collaborator,name, cargo, url_image } = req.body;
        const id_user = req.userId;

        const CollaboratorModel = new Collaborator(id_user);

        await CollaboratorModel.update(id_collaborator, name, cargo, url_image);

        return res.status(200).json({message: 'Collaborator Updated successfully'})
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

export const deleteCollaborator = async (req, res) => {

    try{
        const id_user = req.userId;
        const {id_collaborator} = req.body;

        const CollaboratorModel = new Collaborator(id_user);

        await CollaboratorModel.delete(id_collaborator);

        return res.status(204)

    }catch(error){
        return res.status(400).json({message: error.message})
    }
}

