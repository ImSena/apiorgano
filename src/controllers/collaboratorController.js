const collaborators = [
    {
        "id": 3,
        "name":"Anna Beat",
        "position": "co-CEO",
        "time": "CEO",
        "image": "https:"
      },
      {
        "name":"Bruno",
        "position": "CEO",
        "time": "CEO",
        "image": "https:"
      },
      {
        "name":"Anna Beat",
        "position": "co-CEO",
        "time": "CEO",
        "image": "https:"
      }
]

export const createCollaborator = (req, res)=>{
    //req.params.id
    const {name,position, time, image } = req.body
    const id = collaborators.length;

    const newCollaborator = {
        id,
        name, 
        position,
        time,
        image
    }

    collaborators.push(newCollaborator);

    res.status(201).end();
}

export const getCollaborator = (req, res)=>{
    const {id} = req.params;

    const collaborator = collaborators.find((c)=> c.id == id)

    if(!collaborator){
        res.status(404).json({message: "Collaborator not exists"});
    }

    res.status(200).json(collaborator);
}

export const deleteCollaborator = (req, res)=>{
    const {id} = req.params;

    const indexToRemove = collaborators.findIndex(c => c.id === parseInt(id, 10));

    if(indexToRemove === -1){
        res.status(400).json({message: "Bad Request to delete Collaborator"});
    }

    collaborators.splice(indexToRemove, 1);
    res.status(204).end();
}

export const updateCollaborator = (req, res) =>{
    const {name,position, time, image } = req.body
    const {id} = req.params;

    const indexToUpdate = collaborators.findIndex(c => c.id === parseInt(id, 10));

    if(indexToUpdate === -1){
        res.status(400).json({message: "Bad Request"});
    }

    collaborators[indexToUpdate] = {
        id: parseInt(id, 10),
        name, 
        position,
        time, 
        image
    };

    res.status(200).json(indexToUpdate);
}

export const getAllColaborators = (req, res)=>{
    const {time} = req.params;

    const allColaborators = collaborators.filter(c => c.time == time);

    if(allColaborators.length < 1){
        res.status(400).json({message: "Bad Request"}).end();
    }

    res.status(200).json({collaborators: allColaborators});
}