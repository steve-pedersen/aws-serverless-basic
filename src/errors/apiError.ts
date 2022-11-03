// import { CustomError } from './customError';

// export class ApiError extends CustomError {
//   statusCode = 400;

//   // example using the `yup` validation library
//   constructor(private errors: { inner: { message: string; path: string }[] }) {
//     super('Invalid request parameters');

//     Object.setPrototypeOf(this, ApiError.prototype);
//   }

//   serializeErrors(): { field?: string; message: string }[] {
//     return this.errors.inner.map((e) => ({
//       field: e.path,
//       message: e.message,
//     }));
//   }
// }

/**
 * ApiError
 */
class ApiError {
  httpStatus: number;

  message: string;

  results: Array<any>;

  timestamp: string;

  constructor(status: number, message: string) {
    this.timestamp = new Date().toISOString();
    this.httpStatus = status;
    this.message = message;
  }
}

export default { ApiError };

// {
//   "correlationId": "reference-sys-api|dev2||2022-09-30T16:17:20.926Z|58917edf-9bea-47aa-9049-c5568e3b00b0",
//   "timestamp": "2022-09-30T16:17:20.997Z",
//   "results": [
//       {
//           "statusSet": [
//               {
//                   "errorCode": "404",
//                   "moreInfo": "No match for languageId: d80d79b5-bb07-46b2-9842-3b8135ff4ada",
//                   "details": "Resource not found"
//               }
//           ]
//       }
//   ]
// }
