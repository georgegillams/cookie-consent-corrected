import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  isSingleLoaded as isSinglePaymentLoaded,
  loadSingle as loadSinglePayment
} from 'redux/modules/payments';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { Section } from 'components';
import NotFound from '../NotFound/NotFound';
import HelperFunctions from 'helpers/HelperFunctions';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
      const promises = [];

      if (!isSinglePaymentLoaded(getState())) {
        promises.push(dispatch(loadSinglePayment(params.id)));
      }
      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    }
  }
])
@connect(
  state => ({
    user: state.auth.user,
    newDataAvailable: state.sessions.newDataAvailable,
    payment: state.payments ? state.payments.singleData : null
  }),
  dispatch => bindActionCreators({ loadSinglePayment }, dispatch)
)
export default class PaymentViewer extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    user: PropTypes.object,
    payment: PropTypes.object,
    loadSinglePayment: PropTypes.func.isRequired,
    className: PropTypes.string,
    params: PropTypes.object.isRequired
  };

  static defaultProps = {
    user: null,
    payment: null,
    className: null
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.interval = setInterval(this.reloadDataIfNecessary, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  reloadDataIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadSinglePayment(this.props.params.id);
    }
  };
  render() {
    const { user, payment, loadSinglePayment, className, ...rest } = this.props; // eslint-disable-line no-shadow

    if (!payment) {
      return <NotFound />;
    }

    let paymentStatus = '';
    if (!payment.status || payment.status === 'pending') {
      paymentStatus =
        'is pending. I will approve it soon, and then make the payment.';
    } else if (payment.status === 'authorised') {
      paymentStatus = 'has been approved! I will be making the transfer soon!';
    } else if (payment.status === 'completed') {
      paymentStatus = 'has been completed! Please check your bank account.';
    } else if (payment.status === 'rejected') {
      paymentStatus =
        "has been rejected. I don't just give money to anyone who comes here 🤣";
    }

    return (
      <div className={getClassName('pages__container')}>
        <Helmet title={`Payment ${payment.id}`} />
        <Section name={`Payment ${payment.id}`}>
          Your payment request for £{payment.amount} {paymentStatus}
        </Section>
      </div>
    );
  }
}
