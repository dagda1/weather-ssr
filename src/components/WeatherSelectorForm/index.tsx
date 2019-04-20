import React from 'react';
import { Button, ButtonStyle } from '@cutting/component-library';
import { withFormik, FormikProps } from 'formik';
import { ConnectedFormInput } from '@cutting/connected-components';
import axios from 'axios';
import { HttpStatusCode } from '@cutting/util';

require('./WeatherSelectorForm.scss');

export interface WeatherState {
  city: string;
}

const MyForm: React.FunctionComponent<FormikProps<WeatherState>> = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <ConnectedFormInput {...props} name="city" label="city" placeholder="enter the dragon" />
      <Button type="submit" buttonStyle={ButtonStyle.Primary}>
        Submit
      </Button>
    </form>
  );
};

export const WeatherSelectorForm = withFormik({
  mapPropsToValues: () => ({ city: '' }),

  validate: (values) => {
    const errors: Partial<WeatherState> = {};

    if (!values.city) {
      errors.city = 'City Required';
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, setFieldError }) => {
    try {
      const results = await axios.get(['', 'weather', encodeURIComponent(values.city)].join('/'));

      const forecasts = JSON.parse(results.data).data.list;

      console.log(forecasts);
    } catch (err) {
      const errorMessage =
        err.response.status === HttpStatusCode.NotFound ? 'No such city' : 'Houston, we have a problem';

      setFieldError('city', errorMessage);

      setSubmitting(false);
    }
  },

  displayName: 'WeatherForm'
})(MyForm);
