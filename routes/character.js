import { Router } from "express";
import { createCharacter } from "../controllers/character.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router()

router.post('/', checkAuth, createCharacter);

export default router;
