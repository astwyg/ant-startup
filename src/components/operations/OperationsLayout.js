import React from 'react';
import { connect } from 'dva';

import PageLayout from '../page/PageLayout';
import OperationsSidebar from './OperationsSidebar';

class OperationsLayout extends React.Component{
  render(){
    return (
      <PageLayout>
        <OperationsSidebar />
        <div>
          {this.props.children || '运维信息, 仅做了排班管理.'}
        </div>
      </PageLayout>
    );
  }

}

export default OperationsLayout;

