export class ExtendedError extends Error {
    status: string;
    statusCode: number;

    constructor(statusCode: number, status: string, message: string) {
        super(message);
        this.status = status;
        this.statusCode = statusCode;
    }
};

