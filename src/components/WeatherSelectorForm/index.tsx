import React from 'react';
import { Button, ButtonStyle, ErrorLabel } from '@cutting/component-library';
import { withFormik, FormikProps } from 'formik';
import { ConnectedFormInput } from '@cutting/connected-components';
import { QueryForecast } from '../../containers/Home/types';

require('./WeatherSelectorForm.scss');

export interface WeatherState {
  city: string;
}

export interface FormProps {
  loading: boolean;
  error: string | undefined;
  query: QueryForecast;
}

type Props = FormProps & FormikProps<WeatherState>;

export const Form: React.FunctionComponent<Props> = ({ handleSubmit, error, ...rest }) => (
  <form action="/weather" onSubmit={handleSubmit}>
    <ConnectedFormInput {...rest} name="city" label="city" placeholder="enter the dragon" />
    <Button type="submit" buttonStyle={ButtonStyle.Primary}>
      Submit
    </Button>
    {error && <ErrorLabel errorMessage={error} />}
  </form>
);

export const WeatherSelectorForm = withFormik<FormProps, WeatherState>({
  mapPropsToValues: () => ({ city: '' }),

  validate: (values) => {
    const errors: Partial<WeatherState> = {};

    if (!values.city) {
      errors.city = 'City Required';
    }

    return errors;
  },

  handleSubmit: async (values, { setSubmitting, props: { query } }) => {
    query(values.city);
    setSubmitting(false);
  },

  displayName: 'WeatherForm'
})(Form);
