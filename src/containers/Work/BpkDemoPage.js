/* eslint-disable */
import React from "react";
import BpkImage, { withLoadingBehavior } from "bpk-component-image";
import {
  Section,
  SubSection,
  TextLink,
  Comments,
  NotificationComp
} from "../../components";
import { cssModules } from "bpk-react-utils";

import STYLES from "../pages.scss";

const getClassName = cssModules(STYLES);

class BpkDemoPage extends React.Component {
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
          id="workBpkDemoInline"
          title="Inline Work BpkDemoPage page"
          width="100%"
          height="50rem"
          style={{ border: "none", height: "170rem" }}
          src="https://georgegillams-depreciated.herokuapp.com/work/bpk-component-demo"
        />
      </div>
    );
  }
}

export default BpkDemoPage;
