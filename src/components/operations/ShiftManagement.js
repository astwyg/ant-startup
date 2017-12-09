import React from 'react';
import {
  Table, Icon, Divider, Button, Modal, Layout,message,Pagination,
  Form,Input, Row, Col, Select, Radio
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

import {jsonp} from '../../mimiron3/utils/ajax';
import {createHours} from "../../mimiron3/utils/datetime";
import OperationsLayout from './OperationsLayout';
import { contentPath } from '../../settings';


const AddShiftForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator, getFieldValue } = form;
    const checkTimeAvailable = (rule, value, callback)=>{
      if(getFieldValue('startSign')&&getFieldValue('startTime')&&getFieldValue('endSign')&&getFieldValue('endTime')) {
        if ((getFieldValue('startSign') + getFieldValue('startTime')) >= (getFieldValue('endSign') + getFieldValue('endTime'))) {
          callback("结束时间不得早于或等于开始时间");
        }
      }
      callback()
    };
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
            {getFieldDecorator('startSign',{initialValue:"0", rules: [{
              required: true, message: '不能为空'
            },{
              validator: checkTimeAvailable
            }]})(
              <Select  style={{ width: "50%"}}>
                <Option value="0">今日</Option>
                <Option value="1">次日</Option>
              </Select>)
            }
            {getFieldDecorator('startTime',{ initialValue:"00:00", rules: [{
              required: true, message: '不能为空'
            }]})(
              <Select style={{ width: "50%" }}>
                {createHours().map(h=><Option value={h} key={h}>{h}</Option>)}
              </Select>)
            }
          </FormItem>
          <FormItem label="班次结束时间">
            {getFieldDecorator('endSign',{initialValue:"0", rules: [{
              required: true, message: '不能为空'
            },{
              validator: checkTimeAvailable
            }]})(
              <Select style={{ width: "50%" }}>
                <Option value="0">今日</Option>
                <Option value="1">次日</Option>
              </Select>)
            }
            {getFieldDecorator('endTime',{initialValue:"00:00", rules:  [ {
              required: true, message: '不能为空'
              }]})(
              <Select style={{  width: "50%" }}>
                {createHours().map(h=><Option value={h} key={h}>{h}</Option>)}
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
    const { getFieldDecorator, getFieldValue } = form;
    const checkTimeAvailable = (rule, value, callback)=>{
      if(getFieldValue('startSign')&&getFieldValue('startTime')&&getFieldValue('endSign')&&getFieldValue('endTime')) {
        if ((getFieldValue('startSign') + getFieldValue('startTime')) >= (getFieldValue('endSign') + getFieldValue('endTime'))) {
          callback("结束时间不得早于或等于开始时间");
        }
      }
      callback()
    };
    //拆shiftTime得到startTime, endTime
    let shiftTime = props.shiftTime.split("~");
    const startSign = shiftTime[0].substring(0,2) === "本日"?"0":"1",
      startTime = shiftTime[0].substring(2),
      endSign = shiftTime[1].substring(0,2) === "本日"?"0":"1",
      endTime = shiftTime[1].substring(2);
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
            {getFieldDecorator('startSign',{
              rules: [{
                required: true, message: '不能为空'
              }], initialValue: startSign})(
              <Select style={{ width: "50%"}}>
                <Option value="0">今日</Option>
                <Option value="1">次日</Option>
              </Select>)
            }
            {getFieldDecorator('startTime',{rules: [{ required: true, message: '不能为空' },{validator: checkTimeAvailable}], initialValue: startTime})(
              <Select style={{ width: "50%" }}>
                {createHours().map(h=><Option value={h} key={h}>{h}</Option>)}
              </Select>)
            }
          </FormItem>
          <FormItem label="班次结束时间">
            {getFieldDecorator('endSign',{rules: [{ required: true, message: '不能为空' }], initialValue: endSign})(
              <Select style={{ width: "50%" }}>
                <Option value="0">今日</Option>
                <Option value="1">次日</Option>
              </Select>)
            }
            {getFieldDecorator('endTime',{rules: [{ required: true, message: '不能为空' },{validator:checkTimeAvailable}], initialValue: endTime})(
              <Select style={{  width: "50%" }}>
                {createHours().map(h=><Option value={h} key={h}>{h}</Option>)}
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
                  jsonp({
                    url: 'ShiftManager/updateShiftManager',
                    data:{
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
    contentNumber:5,
    currentPage:0,
    modalVisibleAdd: false,
    modalVisibleEdit: [],
  };
  loadData(){
    jsonp({
      url: 'ShiftManager/getShiftManagerByParm',
      data:{
        number: this.state.contentNumber,
        index:this.state.currentPage,
        type:1,
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
      jsonp({
        url: 'ShiftManager/insertShiftManager',
        data:{
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
            <Table style={{"margin":"10px"}} columns={this.state.columns} dataSource={this.state.data} pagination={false} />
            <div style={{"textAlign":"center"}}>
              <Pagination current={this.state.currentPage+1} onChange={page=>this.setState({currentPage:page})} total={this.state.contentNumber}
                          showSizeChanger showQuickJumper/>
            </div>
          </Row>
        </div>
      </OperationsLayout>
    );
  }
}
