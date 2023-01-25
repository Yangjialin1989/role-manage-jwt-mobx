import React, {useEffect, useState} from 'react';
import {Form, Radio, Input, InputNumber, message, Modal, Popconfirm, Table, Typography, Space, Button} from 'antd';
import {inject,observer} from "mobx-react";
import TextArea from "antd/es/input/TextArea";
import UploadAdminAvatar from "../Upload/UploadAdminAvatar";
const {Search} = Input
 const originData = [];
// for (let i = 0; i < 100; i++) {
//     originData.push({
//         key: i.toString(),
//         name: `Edrward ${i}`,
//         telephone: 32,
//         email: `London Park no. ${i}`,
//     });
// }
// //

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const App = (props) => {
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [value, setValue] = useState(3);
    const [avatar, setAvatar] = useState('https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png');
    const [limit,setLimit]=useState(1);
    const [open,setOpen]=useState(false);
    const [admin,setAdmin]=useState([]);
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            email: '',
            telephone: '',
            ...record,
        });
        setEditingKey(record.id);
    };
    const cancel = async(page,pageSize) => {
        console.log('分页',page)
        setEditingKey('');
        setLimit(page)
        console.log(limit)
        await props.admin.adminlist({limit:page}).then(data=>setData(data.data))
       // window.location.reload()

    };
    const handleDelete = async (record)=>{
        //console.log(typeof(record),record)
        await props.admin.admindelete({id:record,deletedAt:new Date()})
        getAdminList({limit})
    }
    const save = async (record) => {
        try {
            const row = await form.validateFields();
            row.id = record.id;
            row.updatedAt = new Date()
            console.log(row)

                let name = row.name
                await props.admin.adminvalid({name}).then(data=>{
                    if(data.code === 300){
                        props.admin.adminupdate(row).then((data)=>{
                            // console.log(status,msg,data)
                            if(data.status===700){
                                setData(data.data)
                                message.success(data.msg)
                                window.location.reload()
                            }
                            if(data.status===102){
                                console.log('jinlaile')
                                message.error(data.msg)
                            }
                        })
                    }
                   else if(data.code === 102 && name === record.name){
                        props.admin.adminupdate(row).then((data)=>{
                            // console.log(status,msg,data)
                            if(data.status===700){
                                setData(data.data)
                                message.success(data.msg)
                                window.location.reload()
                            }
                            if(data.status===102){
                                console.log('jinlaile')

                                message.error(data.msg)
                            }
                        })
                    }else{
                        message.error('名称重复，请重新输入。')

                        setTimeout('window.location.reload()',3000)

                    }
                })






            const newData = [...data];
            const index = newData.findIndex((item) => record.id === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');

            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    function openModal(record) {
        setAvatar('/api/'+record.avatar)
        console.log(record.avatar)
        setOpen(true)
        setAdmin(record)
        console.log(avatar)
    }

    const columns = [
        {
            title: '管理员',
            dataIndex: 'name',
            width: '40px',
            key:'name',
            editable: true,
            fixed: 'left',
        },{
            title: '密码',
            dataIndex: 'password',
            key:'password',
            width: '30px',
            editable: true,
            fixed: 'left',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key:'email',
            width: '60px',
            editable: true,
        },
        {
            title: '电话',
            dataIndex: 'telephone',
            key:'telephone',
            width: '30px',
            editable: true,
        },{
            title: '简介',
            dataIndex: 'profile',
            width: '100px',
            key:'profile',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key:'_id',
            fixed: 'right',
            width: '60px',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record)}
                style={{
                    marginRight: 8,
                }}
            >
             保存
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>取消</a>


            </Popconfirm>


          </span>

                ) : (
                    <span>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <a>编辑</a>
                    </Typography.Link>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Popconfirm  title="数据无价，您确定删除?" onConfirm={()=>handleDelete(record.id)} >
                    <a style={{color:'red'}}>删除</a>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                       </Popconfirm>
                      <a  style={{color:'green'}} onClick={()=>openModal(record)}>详情</a>

                    </span>

                );
                //Delete






            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'telephone' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const getAdminList=({limit})=>{
        props.admin.adminlist({limit}).then(data=>{
            setData(data.data)
            console.log(data)
        })





    }

    useEffect(() => {
        getAdminList({limit})
    }, []);
    const onSearch = async(value) => {
        //console.log('search',value)
        // let res = await this.props.user.usersearch({name: ''})
        // if (res.data.length === 0) {
        //     message.info('没有查询到数据')
        // } else {
        //     message.success('查询成功')
        //     this.setState({
        //         list: res.data[0]
        //     })
        // }
        if (value === '') {
            let res = await this.props.admin.adminsearch({name: ''})
            if (res.data.length === 0) {
                message.info('没有查询到数据')
            } else {
                //message.success('查询成功')
                this.setState({
                    list: res.data[0]
                })
            }
        } else {
            let res = await props.admin.adminsearch({name: value.trim(),deletedAt:null})
            if (res.data.length === 0) {
                message.info('没有查询到数据')
            } else {
                message.success('查询成功')
                setData(res.data)
            }
        }
    }
        //console.log(res.data)


   function  handleCancel() {
        setOpen(false)
        window.location.reload()

    }
    function onSexChange(e){
        console.log(e.target.value)
        setValue(e.target.value)
    }

    function onReset() {
        setOpen(false)
        window.location.reload()
    }
    const onFinish = async(values)=>{
           values._id=admin._id;
        //console.log(values,admin)

        let {status,msg} = await props.admin.adminupdate(values)
        if(status === 700){
            message.success(msg)
            form1.resetFields();
        }
         if(status=== 107){message.error(msg)}
    }
    const onFinishFailed =  (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Modal title={`${admin.name}的详情页`} open={open} footer={null}  onCancel={handleCancel}>
                <Form
                    form={form1}
                    initialValues={admin}
                    name={'adminInfo'}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label={'头像'}
                        name='avatar'
                    >
                        <img  style={{borderRadius:'50%',width:'100px',height:'100px'}} src={avatar} alt="avatar"/>
                        <div style={{float:'right',marginRight:'30px'}}>
                            <UploadAdminAvatar></UploadAdminAvatar>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="管理员名"
                        name="name"

                        // rules={[
                        //     {
                        //         required: true,
                        //         message: '请输入用户名!',
                        //     },
                        //     {max:12,message:'用户名必须小于等于12位'},
                        //     {min:2,message:'用户名必须大于等于2位'},
                        //     ({ getFieldValue }) => ({
                        //         async validator(rule, value) {
                        //             let name = getFieldValue('name')
                        //             let {code,msg} =  await props.admin.adminvalid({name})
                        //             if(code === 300){
                        //                 return Promise.resolve()
                        //             }else if(code === 102){
                        //                 return Promise.reject(msg)
                        //             }
                        //         },
                        //     })
                        // ]}
                    >
                        <Input  disabled={true} />
                    </Form.Item>
                    <Form.Item
                        label={'性别'}
                        name={'sex'}
                    >
                        <Radio.Group onChange={onSexChange} >
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                            <Radio value={3}>保密</Radio>

                        </Radio.Group>
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
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="简介"
                        name="profile"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="邮箱" name={'email'} rules={[
                        { required: true, message: '请输入邮箱!' },
                        {pattern:/^\w+[@][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)$/,message:'邮箱格式不正确'}]}>
                        <Input   className={'ant-input'}  />
                    </Form.Item>
                    <Form.Item label="电话" name={'telephone'} rules={[
                        { required: true, message: '请输入手机号!' },
                        {
                            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号'
                        }]}>
                        <Input  className={'ant-input'}  />
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                        <Space>
                            <Button  type="primary" htmlType="submit">
                                保存修改
                            </Button>

                            <Button htmlType="button" onClick={onReset}>取消</Button>
                        </Space>

                    </Form.Item>

                </Form>
            </Modal>
            <Form form={form} component={false}>
                <Search allowClear placeholder={'请输入要查询的管理员名称。'}  onSearch={onSearch} size={'large'}></Search>

                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                        pageSize:15
                    }}
                    scroll={{
                        x: 1000,
                        y: 600,
                    }}
                    expandable={null}
                />
            </Form>
        </>

    );
};
export default inject('admin')(observer(App)) ;