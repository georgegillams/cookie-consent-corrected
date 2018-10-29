import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import BpkInput from 'bpk-component-input';
import { Section, SubSection, TextLink, Button, CodeInline } from 'components';
import { create as createPayment } from 'redux/modules/payments';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX
} from 'helpers/constants';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists)
);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

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
    latestCreated: state.payments ? state.payments.latestCreated : null,
    creationError: state.payments ? state.payments.createError.newPayment : null
  }),
  dispatch => bindActionCreators({ createPayment }, dispatch)
)
export default class Payments extends Component {
  static propTypes = {
    latestCreated: PropTypes.object,
    creationError: PropTypes.object,
    createPayment: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: null,
    creationError: null,
    latestCreated: null
  };

  state = {
    amount: '',
    reference: '',
    monzoMeLink: '',
    sortCode: '',
    accountNumber: ''
  };

  onPaymentSubmit = () => {
    const payment = {
      amount: this.state.amount,
      reference: this.state.reference,
      monzoMeLink: this.state.monzoMeLink,
      sortCode: this.state.sortCode,
      accountNumber: this.state.accountNumber
    };
    this.props.createPayment(payment);
  };

  render() {
    const {
      createPayment,
      creationError,
      latestCreated,
      className,
      user,
      ...rest
    } = this.props;

    return (
      <div className={getClassName('pages__container')}>
        <Helmet title="Payments" />
        <Section name="Send me money">
          If you want to send me money, you can do so in a number of ways:
          <SubSection name="Bank transfer">
            A simple bank transfer to
            <CodeInline>04-00-04</CodeInline>
            <CodeInline>05339705</CodeInline>
            would do.
          </SubSection>
          <SubSection name="Monzo">
            If you have Monzo, you can transfer money directly using my phone
            number (
            <TextLink href="tel:+447867592615">+44 786759 2615</TextLink>)<br />
            Otherwise,{" "}
            <TextLink external href="https://monzo.me/georgestuartgillams">
              pay me via Monzo{" "}
            </TextLink>{" "}
            online.
          </SubSection>
          <SubSection name="Circle">
            If you use circle, you can send me money on there using my email (
            <TextLink href="mailto:g@georgegillams.co.uk">
              g@georgegillams.co.uk
            </TextLink>
            ). If you don't already have Circle and you wanna get £5, use this
            link to{" "}
            <TextLink external href="https://www.circle.com/invite/2RH58S">
              sign up to Circle pay{" "}
            </TextLink>
            😉.
          </SubSection>
          <SubSection name="Crypto">
            Here are my crypto wallet addresses incase you&apos;re actually a
            hipster!
            <br />
            <br />
            Bitcoin: <CodeInline>3ApNpbGMWMVVhRJuBLYtZtLwaHqhW73vbw</CodeInline>
            <br />
            Bitcoin Cash:{" "}
            <CodeInline>
              {"qrg7fqthkw08yzp9ys6v7m7394lqj96dzczkhg6r77"}
            </CodeInline>
            <br />
            Ethereum:{" "}
            <CodeInline>
              {"0x5126FD065a2d7Cf77f50f6DDF8DEd144a3e04db3"}
            </CodeInline>
            <br />
            Litecoin:{" "}
            <CodeInline>MPz6NNqU8U2nZMQX3WTwXJjZFhUA31Q1F6</CodeInline>
          </SubSection>
        </Section>
        <Section name="Request money from me">
          {!user && `To make a payment request, you need to be signed in.`}
          {user && (
            <div>
              If I owe you money, you can request it below.
              <br />
              Either provide a monzo.me link, or a sort-code and account number.
              <br />
              <div
                message={this.state.errorMessage}
                show={this.state.errorMessage}
              />
              <br />
              <BpkInput
                valid={this.state.amount.match(DECIMAL_REGEX)}
                className={getClassName('pages__card')}
                id="amount"
                name="Amount"
                value={this.state.amount}
                onChange={event =>
                  this.setState({ amount: event.target.value })
                }
                placeholder="Amount"
              />
              <br />
              <BpkInput
                valid={this.state.reference.match(STRING_REGEX)}
                className={getClassName('pages__card')}
                id="reference"
                name="Reference"
                value={this.state.reference}
                onChange={event =>
                  this.setState({ reference: event.target.value })
                }
                placeholder="Reference / name"
              />
              <br />
              <BpkInput
                valid={this.state.monzoMeLink.match(MONZOME_LINK_REGEX)}
                disabled={
                  this.state.accountNumber !== '' || this.state.sortCode !== ''
                }
                className={getClassName('pages__card')}
                id="monzo.me link"
                name="Monzo.me link"
                value={this.state.monzoMeLink}
                onChange={event =>
                  this.setState({ monzoMeLink: event.target.value })
                }
                placeholder="Monzo.me link"
              />
              <br />
              <BpkInput
                valid={this.state.sortCode.match(SORT_CODE_REGEX)}
                disabled={this.state.monzoMeLink !== ''}
                className={getClassName('pages__card')}
                id="sortCode"
                name="Sort Code"
                value={this.state.sortCode}
                onChange={event =>
                  this.setState({ sortCode: event.target.value })
                }
                placeholder="Sort Code"
              />
              <br />
              <BpkInput
                valid={this.state.accountNumber.match(INT_REGEX)}
                disabled={this.state.monzoMeLink !== ''}
                className={getClassName('pages__card')}
                id="accountNo"
                name="Account Number"
                value={this.state.accountNumber}
                onChange={event =>
                  this.setState({ accountNumber: event.target.value })
                }
                placeholder="Account Number"
              />
              <br />
              {creationError && (
                <div style={{ color: 'red' }}>
                  There was a problem creating your request. Try again later.
                </div>
              )}
              <Button
                disabled={
                  !(
                    this.state.amount.match(DECIMAL_REGEX) &&
                    this.state.reference.match(STRING_REGEX) &&
                    (this.state.monzoMeLink.match(MONZOME_LINK_REGEX) ||
                      (this.state.accountNumber.match(INT_REGEX) &&
                        this.state.sortCode.match(SORT_CODE_REGEX)))
                  )
                }
                onClick={this.onPaymentSubmit}
              >
                REQUEST FUNDS
              </Button>
              {latestCreated && (
                <div>
                  <br />
                  Your payment has been created.{" "}
                  <TextLink href={`/payments/${latestCreated.id}`}>
                    View payment {latestCreated.id}.
                  </TextLink>
                </div>
              )}
            </div>
          )}
        </Section>
      </div>
    );
  }
}
