import ErrorType from '../enums/errorType';

export interface ExtendedError {
    name: string;
    message: string;
    status: number;
    stacktrace: string;
    type: ErrorType;
}

export class ApiError extends Error {
    status;
    stacktrace;
    type;

    constructor(params: ExtendedError) {
        super();

        Error.call(this);
        Error.captureStackTrace(this, this.constructor);

        this.name = params.name || this.constructor.name;
        this.message = params.message || 'There was an unexpected error. Please try again';
        this.status = params.status || 500;
        this.stacktrace = params.stacktrace;
        this.type = params.type;
    }
}

export default (params: ExtendedError): void => {
    throw new ApiError(params);
};
