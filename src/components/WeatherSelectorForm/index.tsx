import React from 'react';
import { Button, ButtonStyle } from '@cutting/component-library';
import { withFormik, FormikProps } from 'formik';
import { LayoutType } from '@cutting/component-library';
import { ConnectedFormInput } from '@cutting/connected-components';

require('./WeatherSelectorForm.scss');

export interface WeatherState {
  city: string;
}

const MyForm: React.FunctionComponent<FormikProps<WeatherState>> = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <ConnectedFormInput {...props} name="city" label="city" />
      <Button type="submit" buttonStyle={ButtonStyle.Primary}>
        Submit
      </Button>
    </form>
  );
};

export const WeatherSelectorForm = withFormik({
  mapPropsToValues: () => ({ city: '' }),

  // Custom sync validation
  validate: (values) => {
    const errors: Partial<WeatherState> = {};

    if (!values.city) {
      errors.city = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  },

  displayName: 'BasicForm'
})(MyForm);
