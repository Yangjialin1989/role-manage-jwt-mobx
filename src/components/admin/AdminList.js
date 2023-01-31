//import React from "@types/react";
import React, { useState,useEffect } from 'react';
import './Welcome.css'
import {inject,observer} from "mobx-react";
import AdminTable from "../Table/AdminTable";
import {Button, Modal, Form, Input,Select, Space,message} from "antd";
import Tree from '../Tree/Tree'
function AdminList (props){
    useEffect(() => {
        console.log('adminlist进来了')
        props.role.list().then(data=>{
            console.log(data.data)
            setRoles(data.data)
            let list = []
            data.data.map(item=>{
                list.push({
                    value:item.id,
                    label:item.roleName
                })
            })
            setRoleOption(list)

        })

    }, []);
   // const [limit,setLimit]=useState(1)
    const [form] = Form.useForm()
    const [roles,setRoles]=useState([])
    const [roleOptions,setRoleOption]=useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuList,setMenuList]=useState([])
    const [permissions,setPermissions]=useState([])
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
        console.log(roles)
        props.role.search({id:values.role_id}).then(data=>{
            console.log(data.data)
            values.menuList = data.data.menuInfo
            values.permissions = data.data.permissionList
            values.roleName = data.data.roleName
            setMenuList(data.data.menuInfo)
            props.admin.register(values).then(data=>{
                if(data.code === 200){
                    message.success(data.msg)
                    form.resetFields();
                    window.location.reload();
                }
                if(data.code === 101){message.error(data.msg)}
            })

        })
        console.log(menuList)
        //alert(data)
        //console.log(data.data.menuInfo)
        //setMenuList()


    }
    const onFinishFailed =  (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields();
    };


   async function validName(value) {
    console.log(value)
        let {code,msg} =  await props.admin.valid({value})
        if(code === 300){
            return Promise.resolve()
        }else if(code === 102){
            return Promise.reject(msg)
        }
    }

    return (
        <>


            <Modal title="添加管理员" open={isModalOpen} footer={null}  onCancel={handleCancel}>
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
                        label="管理员名"
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
                                    let {code,msg} =  await props.admin.valid({name})
                                    if(code === 300){
                                        return Promise.resolve(msg)
                                    }else if(code === 102){
                                        return Promise.reject(msg)
                                    }
                                },
                            })
                        ]}
                    >
                        <Input placeholder={'请添加用户名'}/>
                    </Form.Item>
                    <Form.Item label={'等级'} name={'role_id'}>
                        <Select options={roleOptions}></Select>
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

                <Button type={'primary'} onClick={showModal}>添加管理员</Button>
<hr/>
            <AdminTable></AdminTable>


        </>
    )

}
export default inject('admin','user','permission','role')(observer(AdminList))
