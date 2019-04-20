import React from 'react';
import { ApplicationLayout } from '../../layouts/ApplicationLayout';
import { WeatherSelectorForm } from '../../components/WeatherSelectorForm';

const styles = require('./Home.scss');

export const HomeView: React.FunctionComponent = () => (
  <ApplicationLayout heading="Choose your city">
    <div className={styles.main}>
      <WeatherSelectorForm />
    </div>
  </ApplicationLayout>
);
