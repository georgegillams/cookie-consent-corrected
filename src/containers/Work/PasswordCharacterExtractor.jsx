/* eslint-disable */
import React from "react";
import BpkImage, { withLoadingBehavior } from "bpk-component-image";
import {
  NotificationComp,
  Section,
  SubSection,
  TextLink,
  Comments
} from "../../components";
import { cssModules } from "bpk-react-utils";

import STYLES from "../pages.scss";

const getClassName = cssModules(STYLES);

class Degree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div>
        <NotificationComp type="error">
          This is a legacy page, so it may take some time to load.
        </NotificationComp>
        <iframe
          id="workPasswordCharExtractorInline"
          title="Inline Work Degree page"
          width="100%"
          height="50rem"
          style={{ border: "none", height: "170rem" }}
          src="https://georgegillams-depreciated.herokuapp.com/apps/password-character-extractor"
        />
      </div>
    );
  }
}

export default Degree;
