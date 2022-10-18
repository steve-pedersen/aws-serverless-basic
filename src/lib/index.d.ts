export interface Event {
  body: string;
  headers: any;
  httpMethod?: string;
  path: string;
  queryStringParameters?: any;
}

export interface Context {
  awsRequestId: string;
};