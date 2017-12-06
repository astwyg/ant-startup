import React from 'react';
import { Table, Icon, Divider, Button } from 'antd';

import ajax from '../../mimiron3/utils/ajax';

import OperationsLayout from './OperationsLayout';

import { contentPath } from '../../settings';

export default class ShiftManagement extends React.Component{
  state = {
    columns:[{
      title: '序号',
      dataIndex: 'shiftId',
      key: 'shiftId',
    }, {
      title: '班次名称',
      dataIndex: 'shiftName',
      key: 'shiftName',
    }, {
      title: '班次时间',
      dataIndex: 'shiftTime',
      key: 'shiftTime',
    },{
      title: '班次描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" size="small">操作</Button>
        </span>
      ),
    }],
    data:[],
  };
  componentDidMount(){
    ajax({
      url: contentPath+ 'ShiftManager/getShiftManagerByParm',
      dataType:'jsonp',
      callback:'callback',
      contentType: "application/jsonp; charset=utf-8",
      scriptCharset: 'utf-8',
      data:{
        "callback" : "callback"
        //"emergencyName":eventName,
      },
      success: data => {
        this.setState({
          data:data.item.items,
        })
      }
    });
  };
  render() {
    return (
      <OperationsLayout>
        <div style={{"marginLeft":"256px"}}>
          <h1 style={{"margin":"15px"}}>班次管理</h1>
          <Table style={{"margin":"10px"}} columns={this.state.columns} dataSource={this.state.data} />
        </div>
      </OperationsLayout>
    );
  }
}
