import ErrorType from '../enums/errorType';
import HttpStatus from '../enums/httpStatus';
import apiError, { ExtendedError } from './apiError';

export interface ErrorThrown {
    type: ErrorType;
    error: Error;
}

interface ErrorDetails {
    message: string;
    status: number;
    type: ErrorType;
}

const buildErrorObject = (details: ErrorDetails, err: Error): ExtendedError => ({
    ...err,
    status: details.status,
    type: details.type,
    message: details.message || err.message,
    stacktrace: err.stack || '',
});

export default ({ error, type }: ErrorThrown) => {
    switch (type) {
        case ErrorType.VALIDATION_ERROR:
            ErrorType.CREATE_BALANCE_ERROR;
            apiError(buildErrorObject({ message: error.message, status: HttpStatus.BAD_REQUEST, type }, error));
            break;
        case ErrorType.UNAUTHORIZED:
            apiError(buildErrorObject({ message: error.message, status: HttpStatus.UNAUTHORIZED, type }, error));
            break;
        default:
            apiError(
                buildErrorObject(
                    {
                        message: error.message,
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        type: ErrorType.INTERNAL_ERROR,
                    },
                    error
                )
            );
    }
};
