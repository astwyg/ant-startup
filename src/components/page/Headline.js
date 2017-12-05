import React from 'react';
import { Router, Link  } from 'dva/router';
import styles from './Headline.css';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Headline extends React.Component {
  state = {
    current: 'mail',
  };
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="dummy" disabled>
          <h2>西三物业管理系统</h2>
        </Menu.Item>
        <Menu.Item key="mail">
          <Link to="/">
            <Icon type="appstore" />首页
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Icon type="appstore" />设备管理
        </Menu.Item>
        <Menu.Item key="alipay">
          <Link to="/operations">
            <Icon type="appstore" />运维管理
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}


export default Headline
