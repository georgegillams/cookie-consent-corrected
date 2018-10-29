import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoaded as isPaymentsLoaded,
  load as loadPayments,
  save as updatePayment,
  remove as deletePayment,
} from 'redux/modules/payments';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import { APIEntity, AdminOnly, Loading, TagFilter, Button } from 'components';
import {
  NON_EMOJI_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from 'helpers/constants';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isPaymentsLoaded(getState())) {
        promises.push(dispatch(loadPayments()));
      }
      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    payments: state.payments ? state.payments.data : null,
    user: state.auth.user,
  }),
  dispatch =>
    bindActionCreators(
      { deletePayment, updatePayment, loadPayments },
      dispatch,
    ),
)
export default class Payments extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    payments: PropTypes.arrayOf(PropTypes.object),
    deletePayment: PropTypes.func.isRequired,
    updatePayment: PropTypes.func.isRequired,
    loadPayments: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = { selectedTags: [] };
  }

  componentDidMount = () => {
    this.interval = setInterval(
      this.reloadPaymentsIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadPaymentsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadPayments();
    }
  };

  completePayment = payment => {
    this.props.updatePayment({ ...payment, ...{ status: 'completed' } });
  };

  rejectPayment = payment => {
    this.props.updatePayment({ ...payment, ...{ status: 'rejected' } });
  };

  authorisePayment = payment => {
    this.props.updatePayment({ ...payment, ...{ status: 'authorised' } });
  };

  deletePayment = payment => {
    this.props.deletePayment(payment);
  };

  render() {
    const {
      user,
      payments,
      deletePayment,
      updatePayment,
      loadPayments,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (!payments) {
      return null;
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Payments" />
        <AdminOnly user={user}>
          <div>
            {`Payments: ${payments.length}`}
            <br />
            <br />
            {payments &&
              payments.map(payment => (
                <div>
                  <APIEntity entityType="Payment" entity={payment} />
                  {`Amount ${payment.amount}`}
                  <br />
                  {`Account No ${payment.accountNumber}`}
                  <br />
                  {`Sort code ${payment.sortCode}`}
                  <br />
                  {`Monzo link ${payment.monzoMeLink}`}
                  <br />
                  {`Status ${payment.status}`}
                  <br />
                  <br />
                  <Button
                    disabled={payment.status === 'authorised'}
                    onClick={() => {
                      this.authorisePayment(payment);
                    }}
                  >
                    Authorise payment
                  </Button>
                  <Button
                    disabled={payment.status === 'completed'}
                    onClick={() => {
                      this.completePayment(payment);
                    }}
                  >
                    Complete payment
                  </Button>
                  <Button
                    disabled={payment.status === 'rejected'}
                    destructive
                    onClick={() => {
                      this.rejectPayment(payment);
                    }}
                  >
                    Reject payment
                  </Button>
                  <Button
                    destructive
                    onClick={() => {
                      this.deletePayment(payment);
                    }}
                  >
                    Delete payment
                  </Button>
                  <br />
                </div>
              ))}
          </div>
        </AdminOnly>
      </div>
    );
  }
}
