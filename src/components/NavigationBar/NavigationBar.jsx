import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import { Logo, Button, ContentWidthRestrictor } from '../';
import NavigationItem from './NavigationItem';
import { cssModules } from 'bpk-react-utils';

import STYLES from './navigation-bar.scss';

const getClassName = cssModules(STYLES);

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    // Must show at start in case on desktop
    this.state = { isOpen: false, show: true };
  }

  toggle = () => {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  close = () => {
    this.setState({ isOpen: false });
    setTimeout(() => {
      this.setState({ show: false });
    }, 1000);
  };

  open = () => {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 100);
  };

  render() {
    const { className, user, ...rest } = this.props;
    const outerClassNameFinal = [getClassName('navigation-bar__container')];
    if (className) {
      outerClassNameFinal.push(className);
    }

    const animatedContainerClassNameFinal = [
      getClassName('navigation-bar__animated-container--closed'),
    ];
    if (this.state.isOpen) {
      animatedContainerClassNameFinal.push(
        getClassName('navigation-bar__animated-container--open'),
      );
    }

    const menuItems1 = [
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Blog"
        linkUrl="/blog"
        onClick={this.close}
      />,
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Travel"
        linkUrl="/travel"
        onClick={this.close}
      />,
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Photography"
        linkUrl="/photography"
        onClick={this.close}
      />,
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Work"
        linkUrl="/work"
        onClick={this.close}
      />,
    ];
    const accountItem = (
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name={user ? 'Account' : 'Login'}
        linkUrl="/account"
        onClick={this.close}
      />
    );
    const menuItems2 = [
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="About"
        linkUrl="/about"
        onClick={this.close}
      />,
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Contact"
        linkUrl="/contact"
        onClick={this.close}
      />,
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Github"
        linkUrl="https://github.com/georgegillams"
        hrefExternal
        onClick={this.close}
      />,
      accountItem,
    ];

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <ContentWidthRestrictor>
          <div className={getClassName('navigation-bar__bar')} {...rest}>
            <div
              className={getClassName('navigation-bar__mobile-container--left')}
            >
              <Button bouncy onClick={this.toggle}>
                {this.state.isOpen ? (
                  <BpkIconClose style={{ paddingTop: '.3rem' }} />
                ) : (
                  <BpkIconMenu style={{ paddingTop: '.3rem' }} />
                )}
              </Button>
            </div>
            <div className={getClassName('navigation-bar__desktop-container')}>
              {menuItems1}
            </div>
            <div className={getClassName('navigation-bar__logo-container')}>
              <Logo
                className={getClassName('navigation-bar__nav-item')}
                small
                noPadding
                animated
              />
            </div>
            <div className={getClassName('navigation-bar__desktop-container')}>
              {menuItems2}
            </div>
            <div
              className={getClassName('navigation-bar__mobile-container--rgt')}
            >
              {accountItem}
            </div>
          </div>
          <div className={animatedContainerClassNameFinal.join(' ')}>
            <div
              className={getClassName('navigation-bar__mobile-menu-container')}
            >
              {menuItems1}
              {menuItems2}
            </div>
          </div>
        </ContentWidthRestrictor>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string,
};

NavigationBar.defaultProps = {
  user: null,
  className: null,
};

export default NavigationBar;
