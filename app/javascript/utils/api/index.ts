import { Method } from 'axios';

import * as articles from './articles/articles-api';
export class API {
  public static articles = articles.API;
}

export enum RequestMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IRequest {
  payload?: any;
  query?: {
    [x: string]: string | number | number[] | string[] | null | undefined;
  };
  url: string;
  method: Method;
  headers?: HeadersInit;
}

export interface IServerResponse {
  status: string;
  /**
   * Body response
   */
  data: any;
  /**
   * Response headers
   */
  headers: any;
}

export interface IErrorResponse extends Error {
  response: Response;
}
