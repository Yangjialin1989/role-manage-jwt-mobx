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
    const cancel = () => {
        setEditingKey('');
    };
    const handleDelete = async (record)=>{
        //console.log(typeof(record),record)
        await props.admin.admindelete({id:record})
        getAdminList()
    }
    const save = async (record) => {
        try {
            const row = await form.validateFields();
            row.id = record.id;
            console.log(row)
            await props.user.userupdate(row).then(data=>setData(data.data))


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
    const columns = [
        {
            title: '管理员',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: '30%',
            editable: true,
        },
        {
            title: '电话',
            dataIndex: 'telephone',
            width: '30%',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
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
                inputType: col.dataIndex === 'telephone' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const getAdminList=()=>{
        props.admin.adminlist(1).then(data=>setData(data.data))





    }

    useEffect(() => {
        getAdminList()
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
export default inject('admin')(observer(App)) ;