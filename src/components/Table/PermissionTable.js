import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Popconfirm, Table, Typography} from 'antd';
import {inject,observer} from "mobx-react";



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
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: `Please Input ${title}!`,
                    //     },
                    // ]}
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
        console.log('编辑',record)
        form.setFieldsValue({
            updatedAt: new Date(),
            ...record,
        });
        setEditingKey(record._id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const handleDelete = async (record)=>{
        console.log(typeof(record),record)
        await props.permission.delete({_id:record,deletedAt:new Date()})
        getInfo()
    }
    const save = async (record) => {
        try {
            const row = await form.validateFields();
            console.log(row,record)
            row._id =record._id;
            row.updatedAt=new Date()
            row.parentId = +row.parentId
            row.id = +row.id
            row.isMenu = +row.isMenu
            //let updatedAt = new Date()

            await props.permission.update(row).then(data=>{
                setData(data.data)
                message.success('权限修改成功！')
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
            title:'权限名称',
            dataIndex:'title',
            key:'title',
            fixed: 'left',
            width: '100px',
        },{
            title:'权限id',
            dataIndex:'id',
            key:'id',
            editable: true,
        },{
            title:'父级权限id',
            dataIndex:'parentId',
            key:'parentId',
            editable: true,
        },{
            title:'接口路径',
            dataIndex:'apiPath',
            key:'apiPath',
            editable: true,
        },{
            title:'请求方法',
            dataIndex:'method',
            key:'method'
        },{
            title:'菜单',
            dataIndex:'isMenu',
            key:'isMenu',
            editable: true,

        },{
            title:'菜单图标',
            dataIndex:'menuImgClass',
            key:'menuImgClass',
            editable: true,

        },{
            title:'菜单路径',
            dataIndex:'rule',
            key:'rule',
            editable: true,

        },{
            title:'菜单路由',
            dataIndex:'pathRoute',
            key:'pathRoute',
            editable: true,

        },{
            title:'创建日期',
            dataIndex:'createdAt',
            key:'createdAt'
        },{
            title:'更新日期',
            dataIndex:'updatedAt',
            key:'updatedAt'
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            width: '110px',
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
            //console.log('edit')
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
        props.permission.list().then(data=>{
            setData(data.data)
            let userList = []
            let roleList = []
            let permissionList = []
            let adminList = []
            let menuList = []

            let list = data.data
            list.map((item)=>{
                if(item.isMenu === 1){
                    if(item.parentId === 2){
                        userList.push({
                            menuId:item.id,
                            menuName:item.title,
                            componentPath:item.path,
                            pathRoute: item.pathRoute,
                            menuImgClass: item.menuImgClass,
                            menuUrl:item.rule,
                        });
                    }
                    if(item.parentId === 3){
                        roleList.push({
                            menuId:item.id,
                            menuName:item.title,
                            componentPath:item.path,
                            pathRoute: item.pathRoute,
                            menuImgClass: item.menuImgClass,
                            menuUrl:item.rule,
                        });
                    }
                    if(item.parentId === 4){
                        permissionList.push({
                            menuId:item.id,
                            menuName:item.title,
                            componentPath:item.path,
                            pathRoute: item.pathRoute,
                            menuImgClass: item.menuImgClass,
                            menuUrl:item.rule,
                        });
                    }
                    if(item.parentId === 5){
                        adminList.push({
                            menuId:item.id,
                            menuName:item.title,
                            componentPath:item.path,
                            pathRoute: item.pathRoute,
                            menuImgClass: item.menuImgClass,
                            menuUrl:item.rule,
                        });
                    }

                    if(item.id === 2){
                        item.child = userList;
                    }
                    if(item.id === 3){
                        item.child = roleList;
                    }
                    if(item.id === 4){
                        item.child = permissionList;
                    }
                    if(item.id === 5){
                        item.child = adminList;
                    }
                    if(item.parentId === 0){
                        menuList.push({
                            menuId:item.id,
                            menuName:item.title,
                            menuChilds:item.child,
                            componentPath:item.path,
                            pathRoute: item.pathRoute,
                            menuImgClass: item.menuImgClass,
                            menuUrl:item.rule,
                        })
                    }
                }

            })
           console.log('list',menuList)

        }
        )
    }
    useEffect(() => {
        getInfo()
    }, []);
    const onSearch = async(value) => {
        if (value === '') {
            let res = await this.props.permission.search({title: ''})
            if (res.data.length === 0) {
                message.info('没有查询到数据')
            } else {
                //message.success('查询成功')
                this.setState({
                    list: res.data[0]
                })
            }
        } else {
            let res = await props.permission.search({title: value.trim()})
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
            <Search allowClear placeholder={'请输入要查询的权限名称。'}  onSearch={onSearch} size={'large'}></Search>

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
                scroll={{
                    x: 1000,
                    y: 500,
                }}
                expandable={null}
            />
        </Form>
    );
};
export default inject('admin','user','permission')(observer(App)) ;