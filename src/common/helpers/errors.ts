class BaseError {
    constructor (...args) {
        Error.apply(this, args);
    }
}

export class InternalServerError extends BaseError {
    constructor (public message = 'INTERNAL_SERVER_ERROR', public status = 500) {
        super();
    }
}

export class BadRequestError extends BaseError {
    constructor (public message = 'BAD_REQUEST', public status = 400) {
        super();
    }
}

export class ForbiddenError extends BaseError {
    constructor (public message = 'ACCESS_DENIED', public status = 403) {
        super();
    }
}

export class NotFoundError extends BaseError {
    constructor (public message = 'NOT_FOUND', public status = 404) {
        super();
    }
}

export class UnauthorizedError extends BaseError {
    constructor (public message = 'UNKNOWN_ACCESSOR', public status = 401) {
        super();
    }
}
