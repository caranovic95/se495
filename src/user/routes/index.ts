import express from 'express';
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import {createUser} from "../services/register-user.service";
import { AuthenticatedUser,loginUser} from "../services/login-user.service";
import {verifyToken} from "../../common/middlewares/auth";

const router = express.Router();

router
    .route('/register')
    .post(lift(createUser),respond);

router
    .route('/login')
    .post(lift(loginUser),respond);

    router
    .route('/user')
    .get(lift(AuthenticatedUser),respond);

export default router;