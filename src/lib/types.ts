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

export interface DbConfigFields {
  dbHost: string;
  dbName: string;
  dbPassword: string;
  dbUser: string;
}

export interface DbConfig {
  config: DbConfigFields;
  host: string;
  password: string;
  username: string;
}

export interface SsmConfig {
  env: string;
  region: string;
}

export interface DefaultConfig {
  db: DbConfig;
  dynamoDb: SsmConfig;
  ssm: SsmConfig;
}

/**
 * SSM & MySQL DATABASE CONFIGURATION
 */
// export interface DefaultConfig extends DefaultConfig {}
// export interface DbConfig {
//   config: DbConfigFields;
// }

export interface TenantDbPoolParams {
  database: string;
  host: string;
  password: string;
  user: string;
}

// export interface TenantConfigParams extends DefaultConfig, DbConfigFields {
//   dbHost?: string;
//   roleTenant?: string;
//   tenantId?: string;
// }

// export interface SsmConfig {
//   region: string;
// }

export interface SsmParams {
  token: string;
}

export interface ParameterStoreDataParams {
  Name: string;
  WithDecryption: boolean;
}

export interface ParameterStoreParams {
  ssm: SsmConfig;
}

export interface DbSSMToken {
  token: DbConfigFields;
}

export interface TenantDbParams {
  db: DbConfig;
}

/**
 * REQUEST & RESPONSE DATA
 */
// const CORS_KEY = 'access-control-allow-origin';
// const CONTENT_TYPE = 'content-type';
// const CORRELATION_ID = 's37-correlation-id';
export interface RequestHeaders {
  client_id?: string;
  client_secret?: string;
  's37-correlation-id'?: string;
}

export interface ResponseHeaders {
  'access-control-allow-origin'?: string;
  'content-type'?: string;
  's37-correlation-id'?: string;
}

export interface EventHandlerParams {
  body: string;
  headers: RequestHeaders;
  httpMethod?: string;
  method: string;
  path: string;
  queryStringParameters?: any;
}

export interface GetResourcesResponse {
  code: number;
  payload: GetResourcesPayload;
}

export interface GetResourcesPayload {
  data: any[];
  limit: number;
  start: number;
  total: number;
}
/**
 * 201 Response - request fulfilled, resource created
 */
export interface PostResponse {
  correlationId: string;
  id: string;
  timestamp: number;
}

/**
 * ERRORS
 */
export interface BaseError {
  message: string;
  statusCode: number;
}

export interface ErrorResponse {
  code: number | string;
  payload: ErrorResponseData;
}
export interface ErrorResponseData {
  correlationId: string;
  results: Results;
  timestamp: string;
}

export interface Results {
  [index: number]: StatusSet;
}

export interface StatusSet {
  statusSet: Statuses;
}

export interface Statuses {
  [index: number]: Status;
}
export interface Status {
  details: string;
  errorCode: number | string;
  moreInfo: string;
}
