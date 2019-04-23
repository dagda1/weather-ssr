import React from 'react';
import { Wrap, Layout, GelItem } from '@cutting/react-gel';
import { ExternalLink, Github, Twitter } from '@cutting/component-library';

const styles = require('./Footer.scss');

export const Footer: React.FunctionComponent = () => (
  <footer role="contentinfo">
    <Wrap className="wrapper">
      <Layout>
        <GelItem m="1/3">
          <Layout>
            <GelItem m="1/2" className={styles.logo}>
              <span className={styles.name}>Paul Cowan</span>
            </GelItem>
            <GelItem m="1/2" className={styles.links}>
              <ExternalLink href="mailto:paul.cowan@cutting.scot">paul.cowan@cutting.scot</ExternalLink>
            </GelItem>
          </Layout>
        </GelItem>
        <GelItem m="2/3">
          <Layout>
            <GelItem className={styles.contact}>
              <div>
                <ul className={styles.social}>
                  <li>
                    <ExternalLink href="https://github.com/dagda1">
                      <svg width="20" height="20" viewBox="0 0 200 200">
                        <Github />
                      </svg>
                    </ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href="https://twitter.com/dagda1">
                      <svg width="20" height="20" viewBox="0 0 200 200">
                        <Twitter />
                      </svg>
                    </ExternalLink>
                  </li>
                </ul>
                <ExternalLink href="https://cutting.scot">Portfolio</ExternalLink>
              </div>
            </GelItem>
          </Layout>
        </GelItem>
      </Layout>
    </Wrap>
  </footer>
);
