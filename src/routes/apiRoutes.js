import express from 'express';
import { login, logout } from '../controllers/authController.js';
import {createCollaborator,getCollaborator, deleteCollaborator, updateCollaborator, getAllColaborators } from '../controllers/collaboratorController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/login', login);
router.delete('/logout', logout);

// router.post('/register', register);


// router.post('/time', verifyToken, createTime);
// router.get('/time/:id', verifyToken, getTime);
// router.get('/times', getAllTimes);
// router.delete('/time/:id', verifyToken, deleteTime);
// router.put('/time/:id', verifyToken, updateTime);

router.post('/collaborator', verifyToken, createCollaborator);
router.get('/collaborator/:id', verifyToken, getCollaborator);
router.delete('/collaborator/:id', verifyToken, deleteCollaborator);
router.put('/collaborator/:id', verifyToken, updateCollaborator);
router.get('/collaborators/:time', verifyToken, getAllColaborators);



export default router;