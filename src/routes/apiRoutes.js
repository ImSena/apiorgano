import express from 'express';
import { login, logout } from '../controllers/authController.js';
import {register} from '../controllers/userController.js';
import { createTeam, getTeam, updateTeam, deleteTeam } from '../controllers/teamController.js';
import {createCollaborator,getCollaborator, deleteCollaborator, updateCollaborator, getAllColaborators } from '../controllers/collaboratorController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/login', login);
router.delete('/logout', logout);

router.post('/register', register);


// router.get('/time/:id', verifyToken, getTeam);
router.post('/team', verifyToken, createTeam);
router.get('/team', getTeam);
router.delete('/team', verifyToken, deleteTeam);
router.put('/team', verifyToken, updateTeam);

router.post('/collaborator', verifyToken, createCollaborator);
router.get('/collaborator/:id', verifyToken, getCollaborator);
router.delete('/collaborator/:id', verifyToken, deleteCollaborator);
router.put('/collaborator/:id', verifyToken, updateCollaborator);
router.get('/collaborators/:time', verifyToken, getAllColaborators);



export default router;