import React from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { TextLink, Button } from '../index';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'helpers/constants';

import './forms.scss';

class GTSForm extends React.Component {
  static propTypes = {
    gts: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  onDestinationChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.gts));
    newValue.destination = event.target.value;
    this.props.onDataChanged(newValue);
  };

  onEtaChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.gts));
    newValue.eta = event.target.value;
    this.props.onDataChanged(newValue);
  };

  onEmojiChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.gts));
    newValue.emoji = event.target.value;
    this.props.onDataChanged(newValue);
  };

  render() {
    const { className, gts, onDataChanged, onSubmit, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <label htmlFor="destination" className={'forms__label'}>
          Destination
        </label>
        <BpkInput
          className={'forms__component'}
          id="destination"
          name="destination"
          value={gts.destination}
          onChange={this.onDestinationChanged}
          placeholder="Destination"
        />
        <label htmlFor="eta" className={'forms__label'}>
          ETA
        </label>
        <BpkInput
          className={'forms__component'}
          id="eta"
          name="eta"
          value={gts.eta}
          onChange={this.onEtaChanged}
          placeholder="eta"
        />
        <label htmlFor="emoji" className={'forms__label'}>
          Emoji
        </label>
        <BpkInput
          className={'forms__component'}
          id="emoji"
          name="emoji"
          value={gts.emoji}
          onChange={this.onEmojiChanged}
          placeholder="emoji"
        />
        <br />
        <Button className={'forms__component'} onClick={onSubmit}>
          Create GTS
        </Button>
      </div>
    );
  }
}

GTSForm.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
};

GTSForm.defaultProps = {
  centered: false,
  className: null,
};

export default GTSForm;
