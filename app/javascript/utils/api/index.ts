import { Method } from 'axios';

import * as gems from './gems/gems-api';
export class API {
  public static gems = gems.API;
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
   * Тело ответа сервера
   */
  data: any;
  /**
   * Заголовки ответа сервера
   */
  headers: any;
}

export interface IErrorResponse extends Error {
  response: Response;
}
