import React from 'react';
import { connect } from 'dva';
import IndexPageLayout from '../components/indexPage/IndexPageLayout'

const IndexPage = () => {
  return (
    <div>
      <IndexPageLayout />
    </div>
  );
};

IndexPage.propTypes = {
};

export default connect()(IndexPage);
