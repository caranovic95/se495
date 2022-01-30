import moment from 'moment-timezone';
import winston, { Logger } from 'winston';
import { Format } from 'logform';
import config from './config';

const _isEmpty = (obj: { [s: string]: unknown; } | ArrayLike<unknown>): boolean => {
    return Object.values(obj).every((e) => {
        return !e;
    });
};

// A human readable log formatter.
const readable = (): Format => {
    return winston.format.printf((info) => {
        const when = moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
        const base = `[${ when }] [${ info.label }] ${ info.level }: ${ info.message }`;
        const rest = {
            ...info,
            label: undefined,
            level: undefined,
            message: undefined,
            splat: undefined,
            timestamp: undefined
        };
        if (_isEmpty(rest)) {
            return base;
        }
        return `${ base } ${ JSON.stringify(rest, null, 2) }`;
    });
};

// The components for which loggers have already been configured.
const _components = [];

// Gets the logger for the given component.
const get = (component: string): Logger => {
    // Configure the logger or the component, if needed.
    if (_components.indexOf(component) === -1) {
        const options = {
            format: winston.format.combine(
                winston.format.label({ label: component }),
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.splat(),
                readable(),
            ),
            humanReadableUnhandledException: true,
            level: config.get('LOG_LEVEL')
        };
        winston.loggers.add(component, {
            transports: [
                new (winston.transports.Console)(Object.assign(options, {
                    silent: config.get('NODE_ENV') === 'test'
                }))
            ]
        });
        _components.push(component);
    }
    // Grab the configured logger, and return it.
    return winston.loggers.get(component);
};

export = {
    get
};
