import { Router } from "express";
import { createCharacter, getAll } from "../controllers/character.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router()

router.post('/', checkAuth, createCharacter);

router.get('/', getAll);

export default router;
