import React from 'react';
import { Router, Link, withRouter  } from 'dva/router';
import styles from './Headline.css';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Headline extends React.Component {
  state = {
    current: "/"+window.location.hash.split("/")[1] || "/",
  };
  handleClick = (e) => {
    if(e.key !== window.location.hash.replace("#","")){
      this.props.history.push(e.key)
    }
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
        theme="dark"
      >
        <Menu.Item key="dummy" disabled>
          <h2 style={{"color":"white"}}>西三物业管理系统</h2>
        </Menu.Item>
        <Menu.Item key="/">
            <Icon type="appstore" />首页
        </Menu.Item>
        <Menu.Item key="/devices">
          <Icon type="appstore" />设备管理
        </Menu.Item>
        <Menu.Item key="/operations">
            <Icon type="appstore" />运维管理

        </Menu.Item>
      </Menu>
    );
  }
}


export default withRouter(Headline)
