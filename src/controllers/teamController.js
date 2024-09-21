import Team from "../model/Team.js";

export const createTeam = async (req, res)=>
{
    try{
        const userId = req.userId;
        console.log(userId);
        const {name} = req.body;

        if(!name){
            throw new Error("Param name is undefined");
        }
    
        const TeamModel = new Team(userId);
        
        await TeamModel.create(name);

        return res.status(201).json({message: 'Team created successfully'});
    }catch(error){
       return res.status(400).json({message: error.message});
    }
}

export const getTeam = async (req, res) =>
{
    try{
        const userId = req.userId;
        const TeamModel = new Team(userId);

        const teams = await TeamModel.read();

        return res.status(200).json(teams);
    }catch(error){
        return res.send(400).json({message: error.message});
    }
}

export const updateTeam = async (req, res) =>
{
    try{
        const {name, id_team} = req.body;
        const userId = req.userId;
        const TeamModel = new Team(userId);

        await TeamModel.update(name, id_team);

        return res.status(200).json({message: "Team updated successfully"});
    }catch(error){
        return res.send(400).json({message: error.message});
    }
}

export const deleteTeam = async (req, res) =>
{
    try{
        const userId = req.userId;
        const {id_team} = req.body;
        const TeamModel = new Team(userId);

        await TeamModel.delete(id_team);

        return res.status(204).json({message: "Team deleted successfully"});
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}
