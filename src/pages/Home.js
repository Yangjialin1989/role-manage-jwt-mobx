import React, { useState } from 'react';
import { useEffect } from 'react'
import {Layout, Input, Dropdown,message, theme, Button} from 'antd';
import {UserOutlined,PoweroffOutlined,CopyrightOutlined,QuestionCircleOutlined,GlobalOutlined} from '@ant-design/icons'
import './Home.css'
//import {useNavigate} from "react-router-dom";
//import history from '../utils/history'
import cookie from 'react-cookies'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    GithubOutlined,
    AntDesignOutlined
} from '@ant-design/icons';
import LeftMenu from "../components/LeftMenu";
//Outlet 站位
import {Outlet} from 'react-router-dom'



const { Header, Sider, Content,Footer } = Layout;
const {Search} = Input
function logout1(){
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('refresh_token')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('status')
    cookie.remove('exp')
    cookie.remove('difference')



    //console.log(Home.navigate)

}
function personal(){
    message.info('该功能处于开发阶段，工程师真正努力中。')
}
const items = [
    {
        key: '1',
        label: (
            <span onClick={personal}>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><UserOutlined /><span>&nbsp;&nbsp;</span><span>个人中心</span>
            </span>
        ),
    },
    {
        key: '2',
        label: (
            <span onClick={logout1}>
                <a href="/"><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><PoweroffOutlined /><span>&nbsp;&nbsp;</span><span>退出登录</span></a>
            </span>

        ),
    }
];




function Home(){
   // const navigate = useNavigate()
    //组件加载的时候触发
    useEffect(()=>{
        let user = localStorage.getItem('user')

        setAvatar('/api/'+JSON.parse(user).userInfo.avatar)
        setName(JSON.parse(user).userInfo.name)
    },[])




    const [collapsed, setCollapsed] = useState(false);
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>

            <Header className="header">
                <div className="logo">
                    <a>
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"/>
                        <h1>管理系统</h1>
                    </a>
                </div>


                <div style={{flex: '1 1 0%'}}></div>
                <div className={'ant-space'}>
                    {/*<div className={'ant-space-item'}>*/}
                    {/*        <span className={'icon1'}>*/}

                    {/*            <SearchOutlined  className={'search'} style={{color:'#fff',marginRight:'8px'}}/>*/}

                    {/*            <AutoComplete className={'autocomplete'}*/}
                    {/*                          style={{*/}
                    {/*                              marginTop: 20*/}
                    {/*                          }}*/}
                    {/*                          options={options}*/}
                    {/*                          placeholder="try to type `b`"*/}
                    {/*                          filterOption={(inputValue, option) =>*/}
                    {/*                              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1*/}
                    {/*                          }*/}

                    {/*            >*/}

                    {/*                </AutoComplete>*/}
                    {/*        </span>*/}


                    {/*</div>*/}
                    <div className={'ant-space-item'}>
                            <span className={'icon1'}>

                                    <Search size={'small'} style={{marginTop:'20px',display:"flex"}}></Search>


                            </span>


                    </div>
                    <div className={'ant-space-item'}>
                        <span className={'icon'}>
                        <QuestionCircleOutlined  style={{color:'#fff'}}/>
                        </span>
                    </div>
                    <div className={'ant-space-item'}>
                        <Dropdown
                            menu={
                                {
                                    items}
                            }
                            placement="bottom"
                            overlayStyle={{paddingTop:'30px'}}

                        >
                            <Button style={{background:'#000',border:'0px',marginBottom:'36px'}}>
                                <span className={'icon'} >
                                    <span>
                                <img style={{borderRadius:'50%'}} src={avatar} alt="avatar"/>
                               </span>
                                <span className={'name'}>
                                {name}
                                </span>
                                </span>

                            </Button>

                        </Dropdown>
                    </div>
                    <div className={'ant-space-item'}>
                        <span className={'icon'} style={{color:'#fff'}}>
                            <GlobalOutlined />
                        </span>
                    </div>

                </div>

                {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1}/>*/}
            </Header>
        <Layout>
            <Sider style={{background:'#fff'}} trigger={null} collapsible collapsed={collapsed}>

                <LeftMenu/>
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 106px 16px',
                        padding: 24,
                        minHeight: 600,
                        background: 'colorBgContainer',
                        //background:'pink'
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
            <Footer className={'footer'}>
                <p style={{textAlign:'center'}}>
                    <GithubOutlined /><AntDesignOutlined style={{marginLeft:'20px'}}/>
                </p>

                <p style={{textAlign:'center'}}>
                    <span > <CopyrightOutlined/>2023 基于Ant Design Pro技术   测试版本 V1.0.0</span>
                </p>

            </Footer>
        </Layout>

    );
}
export default Home
