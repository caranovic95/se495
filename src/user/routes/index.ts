import express from 'express';
import respond from "../../common/middlewares/respond";
import lift from "../../common/middlewares/lift";
import {createUser} from "../services/register-user.service";
import {loginUser} from "../services/login-user.service";

const router = express.Router();

router
    .route('/register')
    .post(lift(createUser),respond);

router
    .route('/login')
    .post(lift(loginUser),respond);

export default router;