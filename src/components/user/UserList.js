//import React from "@types/react";
import React, { useState } from 'react';
import './Welcome.css'
import {inject,observer} from "mobx-react";
import UserTable from "../Table/UserTable";
import {Button, Modal, Form, Input, Space,message} from "antd";
import Tree from '../Tree/Tree'
function UserList (props){
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async(values)=>{
        let {code,msg} = await props.user.register(values)
        if(code === 200){
            message.success(msg)
            form.resetFields();

            window.location.reload();
        }
        if(code === 101){message.error(msg)}
    }
    const onFinishFailed =  (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields();
    };




    return (
        <>


            <Modal title="添加用户" open={isModalOpen} footer={null}  onCancel={handleCancel}>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}

                    form={form}
                    name={'registUser'}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                        >
                    <Form.Item
                        label="用户名"
                        name="name"

                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                            {max:12,message:'用户名必须小于等于12位'},
                            {min:2,message:'用户名必须大于等于2位'},
                            ({ getFieldValue }) => ({
                                async validator(rule, value) {
                                    let name = getFieldValue('name')
                                    let {code,msg} =  await props.user.valid({name})
                                    if(code === 300){
                                        return Promise.resolve()
                                    }else if(code === 102){
                                        return Promise.reject(msg)
                                    }
                                },
                            })
                        ]}
                    >
                        <Input  placeholder={'请添加用户名'}/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"

                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },{
                                pattern:
                                    /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
                                message: "8-16位字符，必须包括字母和数字",
                            }
                        ]}
                    >
                        <Input.Password placeholder={'请添加密码'}/>
                    </Form.Item>
                    <Form.Item label="确认密码" dependencies={['password']} name={'password1'} rules={[{
                        required: true,
                        message: '请再次输入密码!',
                    },({ getFieldValue }) => ({
                        validator(rule, value) {
                            console.log('form',value)
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('新密码与确认新密码不同！');
                        },
                    }),]}>
                        <Input.Password  placeholder={'请输入添加的密码'} />
                    </Form.Item>
                    <Form.Item label="邮箱" name={'email'} rules={[
                        { required: true, message: '请输入邮箱!' },
                        {pattern:/^\w+[@][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)$/,message:'邮箱格式不正确'}]}>
                        <Input  placeholder={'邮箱'} className={'ant-input'}  />
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                        <Space>
                            <Button  type="primary" htmlType="submit">
                                注册
                            </Button>

                            <Button htmlType="button" onClick={onReset}>重置</Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Modal>

                <Button type={'primary'} onClick={showModal}>添加用户</Button>
<hr/>
            <UserTable></UserTable>


        </>
    )

}
export default inject('user')(observer(UserList))
