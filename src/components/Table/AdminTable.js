import React, {useEffect, useState} from 'react';
import {Form, Radio,Select, Input, InputNumber, message, Modal, Popconfirm, Table, Typography, Space, Button} from 'antd';
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
    const [avatar, setAvatar] = useState('static/image1.jpeg');
    const [limit,setLimit]=useState(1);
    const [open,setOpen]=useState(false);
    const [admin,setAdmin]=useState([]);
    const [roleOptions,setRoleOptions]=useState([]);
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
        console.log('??????',page)
        setEditingKey('');
        setLimit(page)
        console.log(limit)
        await props.admin.list({limit:page}).then(data=>setData(data.data))
       // window.location.reload()

    };
    const handleDelete = async (record)=>{
        //console.log(typeof(record),record)
        await props.admin.delete({id:record,deletedAt:new Date()})
        getAdminList({limit})
    }
    const save = async (record) => {
        try {
            const row = await form.validateFields();
            row.id = record.id;
            row.updatedAt = new Date()
            console.log(row)

                let name = row.name
                await props.admin.valid({name}).then(data=>{
                    if(data.code === 300){
                        props.admin.update(row).then((data)=>{
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
                        props.admin.update(row).then((data)=>{
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
                        message.error('?????????????????????????????????')

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
        console.log(record)
        setOpen(true)
        setAdmin(record)
        //console.log(avatar)
    }

    const columns = [
        {
            title: '??????',
            dataIndex: 'avatar',
            width: '40px',
            key:'avatar',
            editable: true,
            fixed: 'left',
            render:(_, {avatar})=>

                    (<img style={{width:'40px',height:'40px' }} src={`/api/${avatar}`} alt=""/>)






                //setAvatar(record.avatar)
                //console.log(record)


        },{
        //<img style={{width:'40px',height:'40px' ,background:'red'}} src={avatar} alt=""/>)
            title: '?????????',
            dataIndex: 'name',
            width: '40px',
            key:'name',
            editable: true,
            fixed: 'left',
        },{
        //<img style={{width:'40px',height:'40px' ,background:'red'}} src={avatar} alt=""/>)
            title: '??????',
            dataIndex: 'roleName',
            width: '40px',
            key:'roleName',
            editable: true,
            fixed: 'left',
        },{
            title: '??????',
            dataIndex: 'password',
            key:'password',
            width: '30px',
            editable: true,
            fixed: 'left',
        },
        {
            title: '??????',
            dataIndex: 'email',
            key:'email',
            width: '60px',
            editable: true,
        },
        {
            title: '??????',
            dataIndex: 'telephone',
            key:'telephone',
            width: '30px',
            editable: true,
        },{
            title: '??????',
            dataIndex: 'profile',
            width: '100px',
            key:'profile',
            editable: true,
        },
        {
            title: '??????',
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
             ??????
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>??????</a>


            </Popconfirm>


          </span>

                ) : (
                    <span>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <a>??????</a>
                    </Typography.Link>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Popconfirm  title="???????????????????????????????" onConfirm={()=>handleDelete(record.id)} >
                    <a style={{color:'red'}}>??????</a>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                       </Popconfirm>
                      <a  style={{color:'green'}} onClick={()=>openModal(record)}>??????</a>

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
        console.log('edit')
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
        props.admin.list({limit}).then(data=>{
            //console.log(data)
            setData(data.data)
            data.data.map(item=>{
                setAvatar('/api/'+item.avatar)
            })



        })





    }

    useEffect(() => {
        props.role.list().then(data=>{
            console.log(data.data)
            //setRoles(data.data)
            let list = []
            data.data.map(item=>{
                list.push({
                    value:item.id,
                    label:item.roleName
                })
            })
            setRoleOptions(list)

        })
        getAdminList({limit})
    }, []);
    const onSearch = async(value) => {
        //console.log('search',value)
        // let res = await this.props.user.usersearch({name: ''})
        // if (res.data.length === 0) {
        //     message.info('?????????????????????')
        // } else {
        //     message.success('????????????')
        //     this.setState({
        //         list: res.data[0]
        //     })
        // }
        if (value === '') {
            let res = await this.props.admin.search({name: ''})
            if (res.data.length === 0) {
                message.info('?????????????????????')
            } else {
                //message.success('????????????')
                this.setState({
                    list: res.data[0]
                })
            }
        } else {
            let res = await props.admin.search({name: value.trim(),deletedAt:null})
            if (res.data.length === 0) {
                message.info('?????????????????????')
            } else {
                message.success('????????????')
                console.log('search',res.data)
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
        props.role.search({id:values.role_id}).then(data=>{
            //console.log(data.data)
            values.menuList = data.data.menuInfo
            values.permissions = data.data.permissionList
            values.id=admin.id;
            values.roleName = data.data.roleName
            props.admin.update(values).then(data=>{
                if(data.status === 700){
                    message.success(data.msg)
                    form1.resetFields();
                }
                if(data.status=== 107){message.error(data.msg)}
                setOpen(false)
            })

        })



        //console.log(values,admin)

        let {status,msg} = await props.admin.update(values)

    }
    const onFinishFailed =  (errorInfo: any) => {
        //
        console.log('Failed:', errorInfo);
    };



    return (
        <>
            <Modal title={`${admin.name}????????????`} open={open} footer={null}  onCancel={handleCancel}>
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
                        label={'??????'}
                        name='avatar'
                    >
                        <img  style={{borderRadius:'50%',width:'100px',height:'100px'}} src={avatar} alt="avatar"/>
                        <div style={{float:'right',marginRight:'30px'}}>
                            <UploadAdminAvatar adminInfo={admin}></UploadAdminAvatar>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="????????????"
                        name="name"

                        // rules={[
                        //     {
                        //         required: true,
                        //         message: '??????????????????!',
                        //     },
                        //     {max:12,message:'???????????????????????????12???'},
                        //     {min:2,message:'???????????????????????????2???'},
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
                        label={'??????'}
                        name={'sex'}
                    >
                        <Radio.Group onChange={onSexChange} >
                            <Radio value={1}>???</Radio>
                            <Radio value={2}>???</Radio>
                            <Radio value={3}>??????</Radio>

                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={'??????'} name={'role_id'}>
                        <Select options={roleOptions} defaultValue={admin.roleName}></Select>
                    </Form.Item>
                    <Form.Item
                        label="??????"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '???????????????!',
                            },{
                                pattern:
                                    /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
                                message: "8-16???????????????????????????????????????",
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="??????"
                        name="profile"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="??????" name={'email'} rules={[
                        { required: true, message: '???????????????!' },
                        {pattern:/^\w+[@][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)$/,message:'?????????????????????'}]}>
                        <Input   className={'ant-input'}  />
                    </Form.Item>
                    <Form.Item label="??????" name={'telephone'} rules={[
                        { required: true, message: '??????????????????!' },
                        {
                            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '???????????????????????????'
                        }]}>
                        <Input  className={'ant-input'}  />
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                        <Space>
                            <Button   type="primary" htmlType="submit">
                                ????????????
                            </Button>

                            <Button htmlType="button" onClick={onReset}>??????</Button>
                        </Space>

                    </Form.Item>

                </Form>
            </Modal>
            <Form form={form} component={false}>
                <Search allowClear placeholder={'???????????????????????????????????????'}  onSearch={onSearch} size={'large'}></Search>

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
                        y: 500,
                    }}
                    expandable={null}
                />
            </Form>
        </>

    );
};
export default inject('admin','role','permission')(observer(App)) ;