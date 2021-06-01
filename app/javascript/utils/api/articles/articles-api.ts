import { AxiosResponse } from 'axios';

import { httpRequest } from '../httpRequest';
import { RequestMethod } from '../index';
// import { IArticlesTypeFields } from './index';

export class API {
  public static articles(payload): Promise<AxiosResponse> {
    return httpRequest({
      url: 'articles',
      method: RequestMethod.GET,
      query: payload,
    });
  }
}
