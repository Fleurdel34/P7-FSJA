import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private logger: LoggingService) {}

    handleError(error: any): void {

    if (!error?.message) {
        this.logger.info("Error without message detected");
        console.info(error);
        return;
    }   

    if (error instanceof HttpErrorResponse && error.status >= 400 && error.status < 500) {
        this.logger.warn(error.message);
        console.warn(error);
        return; 
    }

    if (error?.message && error.message.includes('deprecated')) {
        this.logger.warn(error.message);
        console.warn(error);
        return; 
    }


        this.logger.error(error?.message || error.toString());
        console.error(error);
    }
}
