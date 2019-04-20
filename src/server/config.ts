import { environments, env } from '@cutting/util';

export interface Config {
  baseUrl: string;
  apiKey: string;
}

export interface Configs {
  [environments.development]: Config;
  [environments.test]: Config;
  [environments.production]: Config;
}

// TODO: these values would not nomrally be in the source code
// but in some key value store like foreman or vault
export const configs: Configs = {
  [environments.development]: {
    baseUrl: '//api.openweathermap.org/data/2.5/forecast',
    apiKey: 'dc89e20b249f80663e8e415ee905f19e'
  },
  [environments.test]: {
    baseUrl: '//foobar/forecast',
    apiKey: '6667777'
  },
  [environments.production]: {
    baseUrl: '//api.openweathermap.org/data/2.5/forecast',
    apiKey: 'dc89e20b249f80663e8e415ee905f19e'
  }
};

export const currentConfig = configs[env];
