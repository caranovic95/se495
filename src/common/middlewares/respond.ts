// Sends a response based on whatever has been put on res.locals.
import { NextFunction, Request, Response } from 'express';

const respond = (_req: Request, res: Response, _next: NextFunction): void => {
    res.status(res.locals.code);
    const headers = res.locals.headers;
    const content = res.locals.content;
    res.set(headers);
    if (content) {
        if (content.url) {
            res.redirect(content.url);
        } else if (headers['Content-Type'] === 'application/json') {
            res.status(200).json(content);
        } else {
            const buffer = content instanceof Buffer ? content : new Buffer(content, 'binary');
            res.end(buffer);
        }
    } else {
        res.send();
    }
};

export default respond;
