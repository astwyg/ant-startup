import React from 'react';
import { connect } from 'dva';

import OperationsLayout from '../components/operations/OperationsLayout';

const Operations = () => {
  return (
    <div>
      <OperationsLayout />
    </div>
  );
};


export default connect()(Operations);
