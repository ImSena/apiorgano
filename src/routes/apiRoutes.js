import express from 'express';
import { login, logout, sendLinkResetPassword, resetPassword} from '../controllers/authController.js';
import {register} from '../controllers/userController.js';
import { createTeam, getTeam, updateTeam, deleteTeam, getTeamWithCollaborator } from '../controllers/teamController.js';
import {createCollaborator,getCollaborators, deleteCollaborator, updateCollaborator} from '../controllers/collaboratorController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyTokenEmail } from '../middlewares/verifyTokenEmail.js';

const router = express.Router();

router.post('/login', login);
router.delete('/logout', logout);
router.post('/register', register);

router.post('/sendResetPassword', sendLinkResetPassword);
router.post('/resetPassword', verifyTokenEmail ,resetPassword);


// router.get('/time/:id', verifyToken, getTeam);
router.post('/team', verifyToken, createTeam);
router.get('/team', verifyToken, getTeam);
router.get('/team/collaborators', verifyToken, getTeamWithCollaborator);
router.delete('/team', verifyToken, deleteTeam);
router.put('/team', verifyToken, updateTeam);

router.post('/collaborator', verifyToken, createCollaborator);
router.get('/collaborator', verifyToken, getCollaborators);
router.delete('/collaborator', verifyToken, deleteCollaborator);
router.put('/collaborator', verifyToken, updateCollaborator);



export default router;