import { Heading } from '@cutting/component-library';
import { GelItem, Layout, Wrap } from '@cutting/react-gel';
import cs from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { bannerPages } from '../../routes';

const styles = require('./Menu.scss');

export interface MenuState {
  isExpanded: boolean;
}

export class Menu extends React.Component<{}, MenuState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  collapse = () => {
    this.setState({ isExpanded: false });
  };

  toggleIsExpanded = () => {
    this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));
  };

  menuItems = () =>
    bannerPages.map((page) => (
      <li key={page.heading} className={cs(styles.horizontal)}>
        <NavLink to={page.path} activeClassName={styles.active} onClick={this.collapse}>
          {page.heading}
        </NavLink>
      </li>
    ));

  render() {
    return (
      <nav className={cs(styles.container, 'wrapper')}>
        <Wrap>
          <Layout center className={styles.full}>
            <GelItem>
              <ul>
                <li>
                  <Heading level={2}>React SSR Weather</Heading>
                </li>
                {this.menuItems()}
              </ul>
            </GelItem>
          </Layout>
          <Layout
            className={cs(styles.expandable, {
              [styles.expanded]: this.state.isExpanded
            })}
          >
            <GelItem>
              <ul>{this.menuItems()}</ul>
            </GelItem>
          </Layout>
        </Wrap>
      </nav>
    );
  }
}
