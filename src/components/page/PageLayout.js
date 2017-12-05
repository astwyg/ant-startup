import React from 'react';
import { connect } from 'dva';
import styles from './PageLayout.css';

import Headline from './Headline';

const IndexPage = (props ) => {
  return (
    <div className={styles.normal}>
      <Headline />
      {props.children}
    </div>
  );
};

export default connect()(IndexPage);
