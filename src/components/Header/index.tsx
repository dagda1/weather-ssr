import React from 'react';
import { Heading } from '@cutting/component-library';
import { GelItem, Layout, Wrap } from '@cutting/react-gel';

const styles = require('./Header.scss');

export const Header: React.FunctionComponent = () => (
  <header className={styles.container} role="banner" aria-label="React SSR Weather">
    <div className="wrapper">
      <Wrap>
        <Layout>
          <GelItem>
            <Heading level={2}>React Server Side Rendered Weather</Heading>
          </GelItem>
        </Layout>
      </Wrap>
    </div>
  </header>
);
