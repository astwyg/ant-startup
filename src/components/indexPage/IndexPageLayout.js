import React from 'react';
import { connect } from 'dva';
import styles from './IndexPageLayout.css';

import PageLayout from '../page/PageLayout';

const IndexPage = () => {
  return (
    <PageLayout>
      <div className={ styles.fakeIndexInfo }>
        首页信息, 还没做.
      </div>
    </PageLayout>
  );
};

IndexPage.propTypes = {
};

export default connect()(IndexPage);
