import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Popconfirm, Table, Typography} from 'antd';
import {inject,observer} from "mobx-react";
import permissionList from "../permission/PermissionList";



const {Search} = Input
const originData = [];
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
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record._id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            roleName: '',
            permissionList: '',
            updatedAt: new Date(),
            ...record,
        });
        setEditingKey(record._id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const handleDelete = async (record)=>{
        //console.log(typeof(record),record)
        await props.user.userpd({_id:record,deletedAt:new Date()})
        getInfo()
    }
    const save = async (record) => {
        try {
            const row = await form.validateFields();
            row._id = record._id;
            row.updatedAt=new Date()
            console.log(row)
            //let updatedAt = new Date()
            await props.user.userpu(row).then(data=>{
                setData(data.data)
                message.success('?????????????????????')
                window.location.reload()
            })


            const newData = [...data];
            const index = newData.findIndex((item) => record._id === item._id);
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
    const columns = [
        {
            title: '????????????',
            dataIndex: '_id',
           // key: 'roleName',
            width: '15%',
            editable: false,
        },
        {
            title: '????????????',
            dataIndex: 'roleName',
           // key: 'roleName',
            width: '15%',
            editable: true,
        },
        // {
        //     title: '????????????',
        //     dataIndex: 'permissionList',
        //     //key: 'permissionList',
        //     width: '15%',
        //     editable: true,
        //     render:(permissionList)=>permissionList ? permissionList.map((item)=>{
        //         return <li>{item}</li>
        //     }):[]
        // },
        {
            title: '????????????',
            dataIndex: 'createdAt',
           // key: 'createdAt',
            width: '10%',
            editable: false,
        },
        {
            title: '????????????',
            dataIndex: 'updatedAt',
           // key: 'createdAt',
            width: '10%',
            editable: false,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            //key:'_id',
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
                    <Popconfirm  title="???????????????????????????????" onConfirm={()=>handleDelete(record._id)} >
                    <a style={{color:'red'}}>??????</a>
                    </Popconfirm>
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
                //inputType: col.dataIndex === 'telephone' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const getInfo=()=>{
        props.role.list().then(data=>{
            setData(data.data)
            console.log(data)
        }
        )
    }
    useEffect(() => {
        getInfo()
    }, []);
    const onSearch = async(value) => {
        if (value === '') {
            let res = await this.props.role.search({roleName: ''})
            if (res.data.length === 0) {
                message.info('?????????????????????')
            } else {
                //message.success('????????????')
                this.setState({
                    list: res.data[0]
                })
            }
        } else {
            let res = await props.role.search({roleName: value.trim()})
            if (res.data.length === 0) {
                message.info('?????????????????????')
            } else {
                message.success('????????????')
                setData(res.data)
            }
        }
    }
        //console.log(res.data)


        return (
        <Form form={form} component={false}>
            <Search allowClear placeholder={'????????????????????????????????????'}  onSearch={onSearch} size={'large'}></Search>

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
                }}
            />
        </Form>
    );
};
export default inject('admin','user','role')(observer(App)) ;