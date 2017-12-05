import React from 'react';
import { connect } from 'dva';
import styles from './OperationsLayout.css';

import PageLayout from '../page/PageLayout';
import OperationsSidebar from './OperationsSidebar';

const IndexPage = () => {
  return (
    <PageLayout>
      <OperationsSidebar />
      <div className={ styles.fakeOperationsInfo }>
        运维信息, 仅做了排班管理.
      </div>
    </PageLayout>
  );
};

IndexPage.propTypes = {
};

export default connect()(IndexPage);
