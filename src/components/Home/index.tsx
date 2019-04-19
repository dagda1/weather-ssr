import React from 'react';
import { ApplicationLayout } from '../../layouts/ApplicationLayout';

const styles = require('./Home.scss');

export const Home: React.FunctionComponent = () => (
  <ApplicationLayout heading="Which city's weather do you want?">
    <div className={styles.main}>Home</div>
  </ApplicationLayout>
);
