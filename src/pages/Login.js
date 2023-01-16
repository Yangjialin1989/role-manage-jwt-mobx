import React from 'react'
import {Button, Checkbox, Form, Input,message} from "antd";
import './Login.css'
import {useNavigate} from "react-router-dom";
//inject 注入，observer观察
import {inject,observer} from 'mobx-react'
import history from '../utils/history'



function Login(props) {
    const navigate = useNavigate()




    const onFinish = (values) => {
        console.log('Success:', values);
        //后台验证用户名、密码，通过，跳转到首页，失败，提示错误
        //在store中进行，通过mobx 中的action进行。
        props.user.login(values).then((data)=>{
            if(data.code === 200){
                message.success(data.msg)
               //navigate('/index/welecome')
               history.replace('/index/welecome')
               window.location.reload()
            }else{
                message.warning(data.msg)
                navigate('/login')
            }
        }).catch((err)=>{
                message.error(err)
        })



    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={'loginContainer'}>
            <h2>登录</h2>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}
export default inject('user')(observer(Login))