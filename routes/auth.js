import { Router } from "express";
import { register, login, getUser } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router()

router.post('/register', register);

router.post('/login', login);

router.get('/user', checkAuth, getUser);

export default router;
