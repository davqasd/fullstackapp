import { AxiosResponse } from 'axios';

import { httpRequest } from '../httpRequest';
import { RequestMethod } from '../index';

import { IGemsSearchTypeFields } from './index';

export class API {
  public static gemsSearch(payload: IGemsSearchTypeFields): Promise<AxiosResponse> {
    return httpRequest({
      url: 'gem_dictionaries/search',
      method: RequestMethod.GET,
      query: payload,
    });
  }

  public static gemsStats(payload: IGemsSearchTypeFields): Promise<AxiosResponse> {
    return httpRequest({
      url: 'gem_stats',
      method: RequestMethod.GET,
      query: payload,
    });
  }

  public static gemGrade(payload: IGemsSearchTypeFields): Promise<AxiosResponse> {
    return httpRequest({
      url: 'gem_stats/gem_grade',
      method: RequestMethod.GET,
      query: payload,
    });
  }
}
