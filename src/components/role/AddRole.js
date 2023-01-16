import React from 'react'
import {Modal, Form, Input, Button, Space, Tree} from "antd";
import {inject, observer} from "mobx-react";
//context 组件通信
//const {Provider,Consumer} = React.createContext()

interface IPropss{
    open:boolean,
    callback:()=>void
}

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class AddRole extends React.Component<IPropss>{
    formRef = React.createRef();
    constructor(props){
        super(props)
        this.state={
            treeplist:[],
            plist:[],
            message:'this is message ',
            treeData:[
                {
                    title: 'parent 1',
                    key: '0-0',
                    children: [
                        {
                            title: 'parent 1-0',
                            key: '0-0-0',
                            disabled: true,
                            children: [
                                {
                                    title: 'leaf',
                                    key: '0-0-0-0',
                                    disableCheckbox: true,
                                },
                                {
                                    title: 'leaf',
                                    key: '0-0-0-1',
                                },
                            ],
                        },
                        {
                            title: 'parent 1-1',
                            key: '0-0-1',
                            children: [
                                {
                                    title: (
                                        <span
                                            style={{
                                                color: '#1890ff',
                                            }}
                                        >
                sss
              </span>
                                    ),
                                    key: '0-0-1-0',
                                },
                            ],
                        },
                    ],
                },
                {
                    title:'parent 2',
                    key:'1-1'
                },
                {
                    title:'parent 3',
                    key:'3-3'
                }
            ]

        }

    }
    filterplist (plist){
        let arr = []
        plist.map((item)=>{
            if(item.child.length>0){
                //let child = JSON.parse(item.child)
                arr.push({
                    title:item.title,
                    key:item.id,
                    //children:[...this.filterplist(JSON.parse(item.child))]
                    children:[...this.filterplist(item.child)]

                })
            }else{

                arr.push({
                    title:item.title,
                    key:item.id
                })
            }
            return arr
            // arr.push({
            //     title:item.title,
            //     key:item.id
            // })

        })
        this.setState({
            plist:arr
        })
        console.log(arr)
        return arr
    }
    componentDidMount() {
        this.props.user.userplist(1).then(data=>{
            this.filterplist(data.data)

        })
    }

    cancel = ()=>{
        this.props.callback()
    }
    onFinish = (values) => {
        console.log('AddRole ---',values)
    }
    onFinishFail = (errorInfo) => {
        console.log('Failed:',errorInfo)
    }
    onCheck = (checkedKeys, info) => {
        this.formRef.current.setFieldsValue({
            permissionList: checkedKeys.checked
        })

        console.log(this.state.plist)



    };
    onSelect = (selectedKeys, info) => {

        console.log('selected', selectedKeys, info);
    };
    render() {
        return (
            <>
                <Modal title={'添加角色'}
                       open={this.props.open}
                       onCancel={this.cancel}
                       footer={null}
                >
                    <Form
                          ref={this.formRef}
                          name={'AddRole'}
                          onFinish={this.onFinish}
                          onFinishFailed={this.onFinishFailed}
                          autoComplete="off"
                    >
                        <Form.Item name={'roleName'} label={'角色名称'}
                                   rules={[
                                       {
                                           type:'string',
                                           required:true,
                                           validator:(rule,value)=>{
                                               if(value === undefined || value === ''){
                                                   return Promise.reject('角色名称不可以为空')
                                               }
                                               if(value.length<2){
                                                   return Promise.reject('角色长度不可以小于两位')
                                               }
                                               return Promise.resolve()
                                           }
                                       }
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label={'选择权限'}
                                   name={'permissionList'}
                        >
                            <Tree
                                defaultExpandAll
                                checkStrictly
                                showLine
                                checkable
                                onCheck={this.onCheck}
                                treeData={this.state.plist}
                            />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type={'primary'} htmlType={'submit'}>
                                    添加角色
                                </Button>
                                <Button type={'default'} htmlType={'reset'}>
                                    重置
                                </Button>
                            </Space>

                        </Form.Item>
                    </Form>


                </Modal>
            </>
        )
    }
}
export default inject('user')(observer(AddRole))