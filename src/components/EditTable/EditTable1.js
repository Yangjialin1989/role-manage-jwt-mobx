import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Popconfirm, Table, Typography} from 'antd';
import {inject,observer} from "mobx-react";
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
        await props.user.userdelete({_id:record})
        getInfo()
    }
    const save = async (record) => {
        try {
            const row = await form.validateFields();
            row.id = record._id;
            console.log(row)
            await props.user.userupdate(row).then(data=>setData(data.data))


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
            title: '唯一标识',
            dataIndex: '_id',
           // key: 'roleName',
            width: '15%',
            editable: false,
        },
        {
            title: '权限名称',
            dataIndex: 'roleName',
           // key: 'roleName',
            width: '15%',
            editable: true,
        },
        {
            title: '权限列表',
            dataIndex: 'permissionList',
            //key: 'permissionList',
            width: '15%',
            editable: true,
        },
        {
            title: '创建日期',
            dataIndex: 'createdAt',
           // key: 'createdAt',
            width: '10%',
            editable: false,
        },
        {
            title: '更新日期',
            dataIndex: 'updatedAt',
           // key: 'createdAt',
            width: '10%',
            editable: false,
        },
        {
            title: '销毁日期',
            dataIndex: 'deletedAt',
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
                    <Popconfirm  title="数据无价，您确定删除?" onConfirm={()=>handleDelete(record._id)} >
                    <a style={{color:'red'}}>删除</a>
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
        props.user.userpl().then(data=>{
            setData(data.data)
            console.log(data)
        }

        )





    }

    useEffect(() => {
        getInfo()
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
            let res = await this.props.user.usersearch({name: ''})
            if (res.data.length === 0) {
                message.info('没有查询到数据')
            } else {
                //message.success('查询成功')
                this.setState({
                    list: res.data[0]
                })
            }
        } else {
            let res = await props.user.usersearch({name: value.trim()})
            if (res.data.length === 0) {
                message.info('没有查询到数据')
            } else {
                message.success('查询成功')
                setData(res.data)
            }
        }
    }
        //console.log(res.data)


        return (
        <Form form={form} component={false}>
            <Search allowClear  onSearch={onSearch} size={'large'}></Search>

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
export default inject('user')(observer(App)) ;