export interface Event {
  body: string;
  headers: object;
  httpMethod?: string;
  path: string;
  queryStringParameters?: object;
}

export interface Context {
  awsRequestId: string;
}
