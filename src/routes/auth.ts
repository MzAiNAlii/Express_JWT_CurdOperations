import { Router } from 'express'

import siginupcontrollers from "../controllers/auth/signup";

import loginConroller from '../controllers/auth/login';

import refreshController from '../controllers/auth/refreshToken';

const router = Router();

router.post("/signup", siginupcontrollers)

router.post("/login",loginConroller)

router.post("/refresh",refreshController)

export default router