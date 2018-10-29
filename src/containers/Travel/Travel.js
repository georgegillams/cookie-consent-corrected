import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Travel extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    return (
      <div className="container">
        <h1>Travel</h1>
        <Helmet title="Travel"/>
      </div>
    );
  }
}
