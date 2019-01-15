import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectReauthenticating,
  makeSelectReauthenticatingError,
} from './selectors';
import {
  makeSelectUser,
  makeSelectCookiesAllowed,
} from 'containers/App/selectors';
import { reauthenticate, sessionKeyChanged } from './actions';
import { setCookiesAllowed } from 'containers/App/actions';
import reducer from './reducer';
import saga from './saga';
import Authenticator from './Authenticator';

const mapDispatchToProps = dispatch => ({
  sessionKeyChanged: newValue => dispatch(sessionKeyChanged(newValue)),
  setCookiesAllowed: () => dispatch(setCookiesAllowed(true)),
  reauthenticate: () => dispatch(reauthenticate()),
});

const mapStateToProps = createStructuredSelector({
  cookiesAllowed: makeSelectCookiesAllowed(),
  user: makeSelectUser(),
  authenticating: makeSelectReauthenticating(),
  authenticatingError: makeSelectReauthenticatingError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'authenticator', reducer });
const withSaga = injectSaga({ key: 'authenticator', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Authenticator);
export { mapDispatchToProps };
