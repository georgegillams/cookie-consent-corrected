import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';
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

    const menuItems = [
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Home"
        linkUrl="/"
        onClick={this.close}
      />,
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Research"
        linkUrl="/research"
        onClick={this.close}
      />,
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Technical"
        linkUrl="/technical-overview"
        onClick={this.close}
      />,
      <NavigationItem
        className={getClassName('navigation-bar__nav-item')}
        name="Contribute"
        linkUrl="/contribute"
        onClick={this.close}
      />,
    ];

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <ContentWidthRestrictor>
          <div className={getClassName('navigation-bar__bar')} {...rest}>
            <div
              className={getClassName(
                'navigation-bar__mobile-container--center',
              )}
            >
              <Button onClick={this.toggle}>
                {this.state.isOpen ? (
                  <BpkIconClose style={{ paddingTop: '.3rem' }} />
                ) : (
                  <BpkIconMenu style={{ paddingTop: '.3rem' }} />
                )}
              </Button>
            </div>
            <div className={getClassName('navigation-bar__desktop-container')}>
              {menuItems}
            </div>
          </div>
          <div className={animatedContainerClassNameFinal.join(' ')}>
            <div
              className={getClassName('navigation-bar__mobile-menu-container')}
            >
              {menuItems}
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
