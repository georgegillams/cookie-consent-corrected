import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Register extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Register.scss');
    return (
      <div className={styles.registerPage + ' container'}>
        <Helmet title="Register"/>
        <h1>Register an account</h1>
        {!user &&
        <div>
          <form className="register-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter your username" className="form-control"/>
              <br/>
              <input type="text" ref="firstName" placeholder="Enter your first name(s)" className="form-control"/>
              <br/>
              <input type="text" ref="surName" placeholder="Enter your surname" className="form-control"/>
              <br/>
              <input type="text" ref="email" placeholder="Enter your email" className="form-control"/>
              <br/>
              <input type="text" ref="emailConf" placeholder="Confirm your email" className="form-control"/>
              <br/>
              <input type="text" ref="password" placeholder="Choose your password" className="form-control"/>
              <br/>
              <input type="text" ref="passwordConf" placeholder="Confirm your password" className="form-control"/>
              <br/>
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In </button>
            </div>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
