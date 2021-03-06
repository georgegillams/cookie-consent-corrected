import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectUser } from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import NavigationBarWrapper from './NavigationBarWrapper';

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'navigation', reducer });
const withSaga = injectSaga({ key: 'navigation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NavigationBarWrapper);
export { mapDispatchToProps };
