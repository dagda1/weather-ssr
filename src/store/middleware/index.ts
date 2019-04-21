import axios from 'axios';
import { Store, Action } from 'redux';
import { HttpStatusCode } from '@cutting/util';

export enum ApiActionTypes {
  API_REQUEST = '@@api/API_REQUEST'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AxiosOptions<Data = any> {
  method: 'get' | 'post' | 'delete' | 'put';
  url: string;
  data?: Data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createAxiosConfig<Data = any>(options: AxiosOptions) {
  let axiosConfig: AxiosOptions<Data> = {
    method: options.method,
    url: options.url
  };

  if (options.data !== undefined) {
    axiosConfig.data = options.data;
  }

  return axiosConfig;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiAction<ActionType = string, Data = any> extends Action {
  type: ApiActionTypes.API_REQUEST;
  success: ActionType;
  loading: ActionType;
  error: ActionType;
  options: AxiosOptions<Data>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiMiddleWare = <S, A>({ dispatch }: Store) => (next: any) => {
  return (action: ApiAction) => {
    if (ApiActionTypes.API_REQUEST !== action.type) {
      return next(action);
    }

    const { options } = action;

    next({ type: action.loading });

    const axiosConfig = createAxiosConfig(options);

    axios(axiosConfig)
      .then((response) =>
        dispatch({
          type: action.success,
          payload: JSON.parse(response.data).data
        })
      )
      .catch((err) => {
        const errorMessage =
          err.response.status === HttpStatusCode.NotFound ? 'No such city' : 'Houston, we have a problem';

        dispatch({
          type: action.error,
          error: errorMessage
        });
      });
  };
};

export default apiMiddleWare;
