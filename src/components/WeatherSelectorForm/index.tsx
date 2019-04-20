import React from 'react';
import { Button, ButtonStyle } from '@cutting/component-library';
import { withFormik, FormikProps } from 'formik';
import { ConnectedFormInput } from '@cutting/connected-components';
import axios from 'axios';
import { HttpStatusCode } from '@cutting/util';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as Urls from '../../urls';

require('./WeatherSelectorForm.scss');

export interface WeatherState {
  city: string;
}

const Form: React.FunctionComponent<FormikProps<WeatherState>> = (props) => {
  const { handleSubmit } = props;

  return (
    <form action="/weather" onSubmit={handleSubmit}>
      <ConnectedFormInput {...props} name="city" label="city" placeholder="enter the dragon" />
      <Button type="submit" buttonStyle={ButtonStyle.Primary}>
        Submit
      </Button>
    </form>
  );
};

export const WeatherSelectorFormView = withFormik<{ push: typeof push }, WeatherState>({
  mapPropsToValues: () => ({ city: '' }),

  validate: (values) => {
    const errors: Partial<WeatherState> = {};

    if (!values.city) {
      errors.city = 'City Required';
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, setFieldError, props }) => {
    try {
      const results = await axios.post(['', 'weather', encodeURIComponent(values.city)].join('/'));

      const forecasts = JSON.parse(results.data).data.list;

      push(Urls.Forecast);

      console.log(forecasts);
    } catch (err) {
      console.error(err);
      if (!err.response) {
        return;
      }
      const errorMessage =
        err.response.status === HttpStatusCode.NotFound ? 'No such city' : 'Houston, we have a problem';

      setFieldError('city', errorMessage);

      setSubmitting(false);
    }
  },

  displayName: 'WeatherForm'
})(Form);

export const WeatherSelectorForm = connect(
  null,
  {
    push
  }
)(WeatherSelectorFormView);
