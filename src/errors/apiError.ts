import { ErrorResponseData } from '../lib/types';

/**
 * ApiError
 */
class ApiError {
  correlationId: string;

  details: string;

  httpCode: number;

  message: string;

  responseData: any;

  results: Array<any>;

  timestamp: string;

  constructor(status: number, message: string, correlationId: string, details: string = '') {
    this.timestamp = new Date().toISOString();
    this.httpCode = status;
    this.message = message;
    this.correlationId = correlationId;
    this.details = details;
  }

  getHttpCode(): number | string {
    return this.httpCode;
  }

  getLogMessage(): string {
    return `${this.details} | ${this.message}`;
  }

  getResponseData(): ErrorResponseData {
    return {
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      results: [
        {
          statusSet: [
            {
              errorCode: this.httpCode,
              moreInfo: this.message,
              details: this.details,
            },
          ],
        },
      ],
    };
  }
}

export default ApiError;
