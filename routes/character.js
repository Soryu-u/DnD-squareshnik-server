import { Router } from "express";
import { createCharacter, getAll, getMyCharacters, deleteCharacters } from "../controllers/character.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router()

router.post('/', checkAuth, createCharacter);

router.get('/', getAll);

router.get('/own', checkAuth, getMyCharacters);

router.delete('/:id', checkAuth, deleteCharacters);

export default router;
