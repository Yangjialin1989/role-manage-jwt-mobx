import React, {createRef} from 'react'
import {Modal, Form, Input, Button, Space, Tree} from "antd";
import {inject, observer} from "mobx-react";
import {RefObject} from "react";
import PermissionTree from '../Tree/PermissionTree'
//context 组件通信
//const {Provider,Consumer} = React.createContext()

interface IPropss{
    open:boolean,
    callback:(refresh?:boolean)=>void
}
interface IPermission{

}

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};





class AddRole extends React.Component<IPropss>{
    formRef:RefObject
    constructor(props){
        super(props)
        this.formRef = createRef();
        this.state={
            treeplist:[],
            plist:[],
            permissions:['0000'],
            autoExpandParent:true,
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
    filterlists =(permissionList,id:number=0)=>{
       console.log(permissionList)
        let plist = []

       permissionList.map((item)=>{

           if(item.parentId === id){
               // console.log(item)
               // console.log(item.child)
               let children=[]
               item.child.map((child)=>{
                  // console.log('child',child)
                   children.push({
                       title:child.title,
                       key:child.id,
                       children:child.child
                   })
               })
               plist.push({
                   title:item.title,
                   key:item.id,
                   children:children
               })

           }

           //console.log(plist)
       })


       return plist

        // this.setState({
        //     plist:plist
        // })

    }

    generatePermissionList =(permissionList,parentId:number=0)=>{
        let pplist = []
        permissionList.forEach(permission=>{
            if(permission.parentId === parentId){
                //核心代码。
                permission.child = this.generatePermissionList(permission.child,permission.id)
                pplist.push({
                    title:permission.title,
                    key:permission.key,
                    children:permission.child
                })
            }
        })
        console.log(pplist)
        return pplist
    }



    componentDidMount() {
        this.props.permission.list().then(data=>{
            //this.filterplist(data.data)
            let permissionList = []
            let permission = []
            let permission2 = []
            let permission3 = []
            let permission4 = []
            data.data.map((item)=>{
                if(item.isMenu !== 1){
                    permissionList.push(item)
                }
            })
            let child = []
            let child2 = []
            let child3 = []
            let child4 = []

            permissionList.map((item)=>{

                if(item.parentId === 11){
                    //console.log(item)
                    child.push({
                        title:item.title,
                        key:item.key
                    })
                }
                //console.log(child)
                if(item.parentId === 0 && item.id ===11){

                    permission.push({
                        title:item.title,
                        key:item.key,
                        children:child
                    })
                }
            })

            permissionList.map((item)=>{

                if(item.parentId === 22){
                    console.log(item)
                    child2.push({
                        title:item.title,
                        key:item.key
                    })
                }
                //console.log(child)
                if(item.parentId === 0 && item.id ===22){

                    permission2.push({
                        title:item.title,
                        key:item.key,
                        children:child2
                    })
                }
            })
            permissionList.map((item)=>{

                if(item.parentId === 33){
                    console.log(item)
                    child3.push({
                        title:item.title,
                        key:item.key
                    })
                }
                //console.log(child)
                if(item.parentId === 0 && item.id ===33){

                    permission3.push({
                        title:item.title,
                        key:item.key,
                        children:child3
                    })
                }
            })
            permissionList.map((item)=>{

                if(item.parentId === 44){
                    console.log(item)
                    child4.push({
                        title:item.title,
                        key:item.key
                    })
                }
                //console.log(child)
                if(item.parentId === 0 && item.id ===44){

                    permission4.push({
                        title:item.title,
                        key:item.key,
                        children:child4
                    })
                }
            })
            let pl = [...permission,...permission2,...permission3,...permission4]
            console.log('userplist',pl)
            this.setState({
                plist:pl

            })

        })
        let lists = window.localStorage.getItem('user')
        //console.log('tree',JSON.parse(lists).permissionInfo)

    }

    cancel = ()=>{
        this.props.callback(true)
    }
    onFinish = (values) => {
       // values.push({id:new Date().valueOf()})
        let values1 = {
            'permissionList':this.state.permissions[1],
            'menuInfo':this.state.permissions[0],
            'roleName':values.roleName,
            'id':new Date().valueOf()
        }
        console.log('AddRole ---',values1)
        this.props.role.save(values1).then(data=>{
            console.log(data)
            this.cancel()
            window.location.reload()


        })
    }
    onFinishFail = (errorInfo) => {
        console.log('Failed:',errorInfo)

    }
    onCheck = (checkedKeys, selectedkeys, info) => {
        console.log('checkedKeys',checkedKeys,selectedkeys)
        this.formRef.current.setFieldsValue({
            permissionList: checkedKeys.checked
        })
        // this.plist.map((item)=>{
        //     if(item.key<100 && item.key === checkedKeys){
        //         //item.children.key
        //     }
        // })
        //console.log(this.state.plist)
    };
    addRole = () =>{

    }


    onSelect = (selectedKeys, info) => {

        console.log('selected', selectedKeys, info);
    };
    getPermissions=(permissions)=>{
        console.log(permissions)
        this.setState({
            permissions:permissions
        })
    }
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
                          initialValues={{
                              roleName:'',
                              permissionList:[]
                          }}
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
                        {/*<Form.Item label={'选择权限'}*/}
                        {/*           name={'permissionList'}*/}
                        {/*>*/}
                        {/*    <Tree*/}
                        {/*        defaultExpandAll*/}
                        {/*        checkStrictly*/}
                        {/*        showLine*/}
                        {/*        checkable*/}
                        {/*        autoExpandParent={this.state.autoExpandParent}*/}
                        {/*        onCheck={this.onCheck}*/}
                        {/*        treeData={this.state.plist}*/}
                        {/*    />*/}
                        {/*</Form.Item>*/}
                        <Form.Item label={'选择权限'} name={'permissionList'}>
                            <PermissionTree getPermissions={permissions=>this.getPermissions(permissions)}></PermissionTree>
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
export default inject('role','permission')(observer(AddRole))