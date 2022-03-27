import config from "../helpers/config";
import jwt from 'jsonwebtoken';

const secretkey = config.get('SECRET_KEY');

export async function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.sendStatus(403);
    } else {
        const bearerToken = bearerHeader.split(' ')[1];
        await jwt.verify(bearerToken, secretkey);
        next();
    }
}