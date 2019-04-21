import { openWeatherResponse } from '../../tests/fixtures/response';
import { forecastReducer, initialForecastState } from './reducer';
import { ForecastActionTypes } from './types';
import { detailSelector, summarySelector } from './selectors';

describe('forecast selectors', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let state: any;

  beforeEach(() => {
    state = {
      forecast: forecastReducer(initialForecastState, {
        type: ForecastActionTypes.FORECAST_SUCCESS,
        payload: openWeatherResponse
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    };
  });

  describe('detailSelector', () => {
    it('selects forecasts for that day', () => {
      const forecasts = detailSelector(state, { date: { id: '11', date: '2019-04-26' } });

      expect(forecasts.length).toBe(8);

      expect(forecasts.every((x) => x.dateKey === '2019-04-26'));
    });
  });

  describe('summarySelector', () => {
    it('selects summary for that day', () => {
      const summary = summarySelector(state, { date: { id: '22', date: '2019-04-26' } });

      expect(summary.id).toBe(1474848000);
    });
  });
});
