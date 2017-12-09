import React from 'react';
import {
  Table, Icon, Divider, Button, Modal, Layout,message,
  Form,Input, Row, Col, Select, Radio
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

import ajax from '../../mimiron3/utils/ajax';
import OperationsLayout from './OperationsLayout';
import { contentPath } from '../../settings';

const AddShiftForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="新增班次"
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="班次名称">
            {getFieldDecorator('shiftName', {
              rules: [{ required: true, message: '不能为空' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="班次开始时间">
            {getFieldDecorator('startSign',{rules: [{ required: true, message: '不能为空' }]})(
              <Select initialValue="0" style={{ width: "50%"}}>
                <Option value="0">今日</Option>
                <Option value="1">次日</Option>
              </Select>)
            }
            {getFieldDecorator('startTime',{rules: [{ required: true, message: '不能为空' }]})(
              <Select initialValue="00:00" style={{ width: "50%" }}>
                <Option value="00:00">00:00</Option>
                <Option value="01:00">01:00</Option>
              </Select>)
            }
          </FormItem>
          <FormItem label="班次结束时间">
            {getFieldDecorator('endSign',{rules: [{ required: true, message: '不能为空' }]})(
              <Select initialValue="0" style={{ width: "50%" }}>
                <Option value="0">今日</Option>
                <Option value="1">次日</Option>
              </Select>)
            }
            {getFieldDecorator('endTime',{rules: [{ required: true, message: '不能为空' }]})(
              <Select initialValue="00:00" style={{  width: "50%" }}>
                <Option value="00:00">00:00</Option>
                <Option value="01:00">01:00</Option>
              </Select>)
            }
          </FormItem>
          <FormItem label="班次描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '不能为空' }],
            })(
              <TextArea rows={3} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

const EditShiftForm = Form.create()(
  (props) => {
    const { visible, onCancel, onEdit, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="修改班次"
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onEdit}
      >
        <Form layout="vertical">
          <FormItem label="班次名称">
            {getFieldDecorator('shiftName', {
              rules: [{ required: true, message: '不能为空' }],
              initialValue: props.shiftName
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="班次开始时间">
            {getFieldDecorator('startSign',{rules: [{ required: true, message: '不能为空' }], initialValue: props.startSign})(
              <Select style={{ width: "50%"}}>
                <Option value="0">今日</Option>
                <Option value="1">次日</Option>
              </Select>)
            }
            {getFieldDecorator('startTime',{rules: [{ required: true, message: '不能为空' }], initialValue: props.startTime})(
              <Select style={{ width: "50%" }}>
                <Option value="00:00">00:00</Option>
                <Option value="01:00">01:00</Option>
              </Select>)
            }
          </FormItem>
          <FormItem label="班次结束时间">
            {getFieldDecorator('endSign',{rules: [{ required: true, message: '不能为空' }], initialValue: props.endSign})(
              <Select style={{ width: "50%" }}>
                <Option value="0">今日</Option>
                <Option value="1">次日</Option>
              </Select>)
            }
            {getFieldDecorator('endTime',{rules: [{ required: true, message: '不能为空' }], initialValue: props.endTime})(
              <Select style={{  width: "50%" }}>
                <Option value="00:00">00:00</Option>
                <Option value="01:00">01:00</Option>
              </Select>)
            }
          </FormItem>
          <FormItem label="班次描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '不能为空' }],
              initialValue: props.description
            })(
              <TextArea rows={3} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

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
          <Button
            type="primary"
            size="small"
            onClick={()=>{
              let modalVisibleEdit = this.state.modalVisibleEdit;
              modalVisibleEdit[record.shiftId] = true;
              this.setState({modalVisibleEdit});
            }}>
              修改
            </Button>
            <EditShiftForm
              ref={form=>{
                this.editShiftForm = this.editShiftForm || {};
                this.editShiftForm[record.shiftId] = form;
              }}
              visible={this.state.modalVisibleEdit[record.shiftId]}
              onCancel={()=>{
                let modalVisibleEdit = this.state.modalVisibleEdit;
                modalVisibleEdit[record.shiftId] = false;
                this.setState({modalVisibleEdit});
              }}
              onEdit={()=>{
                const form = this.editShiftForm[record.shiftId];
                form.validateFields((err, values) => {
                  if (err) {
                    return;
                  }
                  ajax({
                    url: contentPath+ 'ShiftManager/updateShiftManager',
                    dataType:'jsonp',
                    callback:'callback',
                    contentType: "application/jsonp; charset=utf-8",
                    scriptCharset: 'utf-8',
                    data:{
                      callback:"callback",
                      shiftId:record.shiftId,
                      ...values
                    },
                    success: data => {
                      if(data.item.resp.responseCommand === "OK"){
                        form.resetFields();
                        this.setState(()=>{
                          let modalVisibleEdit = this.state.modalVisibleEdit;
                          modalVisibleEdit[record.shiftId] = false;
                          this.setState({modalVisibleEdit});
                        },()=>this.loadData());
                        message.success("修改成功");
                      } else {
                        message.error("修改失败");
                      }
                    }
                  });
                });
              }}
              {...record}
            />
        </span>
      ),
    }],
    data:[],
    modalVisibleAdd: false,
    modalVisibleEdit: []
  };
  loadData(){
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
  componentDidMount(){
    this.loadData();
  };
  doAddShift = ()=>{
    const form = this.addShiftForm;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      ajax({
        url: contentPath+ 'ShiftManager/insertShiftManager',
        dataType:'jsonp',
        contentType: "application/jsonp; charset=utf-8",
        scriptCharset: 'utf-8',
        data:{
          "callback" : "callback",
          ...values
        },
        success: data => {
          form.resetFields();
          this.setState({ modalVisibleAdd: false },()=>this.loadData());
          message.success("新增成功");
        }
      });
    });
  };
  render() {
    return (
      <OperationsLayout>
        <div style={{"marginLeft":"256px"}}>
          <Row style={{"margin":"20px", "height":"50px"}}>
            <h1 style={{"float":"left"}}>班次管理</h1>
            <Button
              style={{"float":"right", "marginTop":"25px"}}
              type="primary"
              onClick={()=>this.setState({modalVisibleAdd:true})}>
              新增班次
            </Button>
            <AddShiftForm
              ref={form=>{this.addShiftForm = form}}
              visible={this.state.modalVisibleAdd}
              onCancel={()=>this.setState({modalVisibleAdd:false})}
              onCreate={this.doAddShift}
            />
          </Row>
          <Row>
            <Table style={{"margin":"10px"}} columns={this.state.columns} dataSource={this.state.data} />
          </Row>
        </div>
      </OperationsLayout>
    );
  }
}
