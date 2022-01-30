import qs from 'qs';
import config from '../helpers/config';
import Logger from '../helpers/logger';
import * as errors from '../helpers/errors';

const logger = Logger.get('SYSTEM');

const _code = (method: { name: string }, output: any): number => {
    if (!output) {
        return 204;
    }
    const name = method.name;
    if (!name) {
        return 200;
    }
    if (name.match(/^create/)) {
        return 201;
    }
    return 200;
};

const _headers = (method: { name: string }, output: any): { Location?: string } => {
    const name = method.name;
    if (name && name.match(/^create/)) {
        let model = `${name.charAt(6).toLowerCase()}${name.substring(7)}s`;
        while (model.match(/[A-Z]/)) {
            const x = /([^A-Z]*)([A-Z])(.*)/.exec(model);
            model = `${x[1]}-${x[2].toLowerCase()}${x[3]}`;
        }
        return {
            Location: `${config.get('API_BASE_URL')}/${model}/${output.id}`,
        };
    }
    return {};
};

const _gather = (req: {
    headers: any[];
    params: any[];
    query: any[];
    body: any[];
    files?: any[];
    file?: any;
    pod?: any;
}): any => {
    const input: any = {};
    Object.keys(req.headers).forEach((key) => {
        if (input[key] !== undefined) {
            logger.warn(`Key ${key} found @ headers already exists, and will be overwritten.`);
        }
        input[key] = req.headers[key];
    });
    Object.keys(req.params).forEach((key) => {
        if (input[key] !== undefined) {
            logger.warn(`Key ${key} found @ params already exists, and will be overwritten.`);
        }
        input[key] = req.params[key];
    });
    Object.keys(req.query).forEach((key) => {
        if (input[key] !== undefined) {
            logger.warn(`Key ${key} found @ query already exists.`);
        }
        input[key] = req.query[key];
    });
    Object.keys(req.body).forEach((key) => {
        if (input[key] !== undefined) {
            logger.warn(`Key ${key} found @ body already exists.`);
        }
        input[key] = req.body[key];
    });
    if (req.files) {
        if (input.files !== undefined) {
            logger.warn('Key files already exists.');
        }
        input.files = req.files;
    }
    if (req.file) {
        if (input.file !== undefined) {
            logger.warn('Key file already exists.');
        }
        input.file = req.file;
    }
    return Object.assign(input, req.pod || {});
};

const _scatter = (output: {
    contentType?: string;
    data: any;
}): { body: string; headers: { 'Content-Type': 'application/json' } } => {
    let response = null;
    if (output && output.contentType && output.data) {
        response = {
            body: output.data.buffer,
            headers: { 'Content-Type': output.contentType },
        };
    } else {
        response = {
            body: output,
            headers: { 'Content-Type': 'application/json' },
        };
    }
    return response;
};

// Calls the given HTTP agnostic method.
// Gathers its input from the HTTP request, and scatters its output to the HTTP response.
const lift = (
    method: (input: any) => any,
    gather?: (params: any) => any,
    scatter?: any
): ((req: any, res: any, next: any) => void) => {
    return async (req, res, next) => {
        try {
            const input = (gather || _gather)(req);
            const key =
                req.originalUrl + (req.query ? qs.stringify(req.query) : '') + (req.body ? qs.stringify(req.body) : '');
            const output = await method(input);
            const { body, headers } = (scatter || _scatter)(output);
            res.locals.content = body;
            res.locals.code = _code(method, output);
            res.locals.headers = Object.assign(_headers(method, output), headers);
            next();
        } catch (error) {
            let _error;
            if (!error.status) {
                _error = new errors.InternalServerError();
            } else {
                _error = error;
            }
            res.status(_error.status).json({ message: _error.message });
        }
    };
};

export default lift;
