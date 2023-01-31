import React, {createRef} from 'react'
import {Modal, Radio,Form, Input, InputNumber,Button, Space, Select, Tree} from "antd";
import {inject, observer} from "mobx-react";
import {RefObject} from "react";
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





class AddPermission extends React.Component<IPropss>{
    formRef:RefObject
    constructor(props){
        super(props)
        this.formRef = createRef();
        this.state={
            options:[
                {
                value:'删除权限',
                label:'删除权限'
            },{
                value:'删除用户',
                label:'删除用户'
            },{
                value:'删除管理员',
                label:'删除管理员'
            },{
                value:'删除角色',
                label:'删除角色'
            },{
                value:'更新权限',
                label:'更新权限'
            },{
                value:'更新用户',
                label:'更新用户'
            },{
                value:'更新管理员',
                label:'更新管理员'
            },{
                value:'更新角色',
                label:'更新角色'
            },{
                value:'查询权限',
                label:'查询权限'
            },{
                value:'查询用户',
                label:'查询用户'
            },{
                value:'查询管理员',
                label:'查询管理员'
            },{
                value:'查询角色',
                label:'查询角色'
            },{
                value:'添加权限',
                label:'添加权限'
            },{
                value:'添加用户',
                label:'添加用户'
            },{
                value:'添加管理员',
                label:'添加管理员'
            },{
                value:'添加角色',
                label:'添加角色'
            },

            ],
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
                    key:permission.id,
                    children:permission.child
                })
            }
        })
        //console.log(pplist)
        return pplist
    }



    componentDidMount() {
        this.props.permission.list().then(data=>{
            //this.filterplist(data.data)
            //console.log('permissionlist',data.data)
            this.setState({
                plist:this.generatePermissionList(data.data)

            })

        })
        let lists = window.localStorage.getItem('user')
        //console.log('tree',JSON.parse(lists).permissionInfo)

    }

    cancel = ()=>{
        this.props.callback(true)
    }
    onFinish = (values) => {
        console.log(values)
       // values.push({id:new Date().valueOf()})
        values.createdAt = new Date();
       // let values1 = values
       console.log('AddRole ---',values)
        let params={
            'title':values.title[0],
            'apiPath':values.apiPath ?values.apiPath[0]:'',
            'createdAt':new Date(),
            'path':values.path?values.path[0]:'',
            'pathRoute':values.pathRoute?values.pathRoute[0]:'',
            'rule':values.rule?values.rule[0]:'',
            'id':values.id,
            'isMenu':values.isMenu,
            'parentId':values.parentId,
            'key':values.key,
            'parentKey':values.parentKey,
            'menuImgClass':values.menuImgClass,
            'isContainChildren':values.isContainChildren
        }
        console.log(params)
        this.props.permission.save(params).then(data=>{
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
        this.plist.map((item)=>{
            if(item.key<100 && item.key === checkedKeys){
                //item.children.key
            }
        })
        //console.log(this.state.plist)
    };
    addRole = () =>{

    }


    onSelect = (selectedKeys, info) => {

        console.log('selected', selectedKeys, info);
    };
    render() {
        return (
            <>
                <Modal title={'添加权限'}
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
                          labelCol={{
                              span: 8,
                          }}
                          wrapperCol={{
                              span: 16,
                          }}
                          initialValues={{
                              roleName:'',
                              permissionList:[]
                          }}
                    >
                        <Form.Item name={'title'} label={'权限名称'}
                                   rules={[
                                       {
                                           type:'string',
                                           required:true,
                                           validator:(rule,value)=>{
                                               if(value === undefined || value === ''){
                                                   return Promise.reject('权限名称不可以为空')
                                               }

                                               return Promise.resolve()
                                           }
                                       }
                                   ]}
                        >
                            <Select mode={'tags'} options={this.state.options}></Select>
                        </Form.Item>
                        <Form.Item label={'接口路径'}  name={'apiPath'}>
                            <Select mode={'tags'} options={[
                                {value:'/users/register',label:'/users/register'},
                                {value:'/users/delete',label:'/users/delete'},
                                {value:'/users/valid',label:'/users/valid'},
                                {value:'/users/search',label:'/users/search'},
                                {value:'/users/update',label:'/users/update'},
                                {value:'/users/avatar',label:'/users/avatar'},
                                {value:'/users/list',label:'/users/list'},
                                {value:'/users/info',label:'/users/info'},
                                {value:'/admins/register',label:'/admins/register'},
                                {value:'/admins/delete',label:'/admins/delete'},
                                {value:'/admins/valid',label:'/admins/valid'},
                                {value:'/admins/search',label:'/admins/search'},
                                {value:'/admins/update',label:'/admins/update'},
                                {value:'/admins/avatar',label:'/admins/avatar'},
                                {value:'/admins/list',label:'/admins/list'},
                                {value:'/admins/info',label:'/admins/info'},
                                {value:'/roles/register',label:'/roles/register'},
                                {value:'/roles/delete',label:'/roles/delete'},
                                {value:'/roles/valid',label:'/roles/valid'},
                                {value:'/roles/search',label:'/roles/search'},
                                {value:'/roles/update',label:'/roles/update'},
                                {value:'/roles/avatar',label:'/roles/avatar'},
                                {value:'/roles/list',label:'/roles/list'},
                                {value:'/roles/info',label:'/roles/info'},
                                {value:'/permissions/register',label:'/permissions/register'},
                                {value:'/permissions/delete',label:'/permissions/delete'},
                                {value:'/permissions/valid',label:'/permissions/valid'},
                                {value:'/permissions/search',label:'/permissions/search'},
                                {value:'/permissions/update',label:'/permissions/update'},
                                {value:'/permissions/avatar',label:'/permissions/avatar'},
                                {value:'/permissions/list',label:'/permissions/list'},
                                {value:'/permissions/info',label:'/permissions/info'},
                            ]}/>
                        </Form.Item>

                        <Form.Item label={'组件路径'}   name={'path'}>
                            <Select mode={'tags'} options={[
                                {value:'welecome/Welcome',label:'welcome/Welcome'},
                                {value:'user/UserManager',label:'user/UserManager'},
                                {value:'user/Userlist',label:'user/Userlist'},
                                {value:'user/edituser',label:'user/Edituser'},
                                {value:'role/AddRole',label:'role/AddRole'},
                                {value:'role/RoleInfo',label:'role/RoleInfo'},
                                {value:'role/RoleList',label:'role/RoleList'},
                                {value:'permission/PermissionList',label:'permission/PermissionList'},
                                {value:'admin/AdminList',label:'admin/AdminList'},

                            ]}/>
                        </Form.Item>

                        <Form.Item label={'菜单'} name={'isMenu'}>
                            <InputNumber></InputNumber>
                        </Form.Item>
                        <Form.Item label={'子菜单'} name={'isContainChildren'}>
                        <Radio.Group>
                            <Radio value={true}>包含</Radio>
                            <Radio value={false}>不包含</Radio>

                        </Radio.Group>
                    </Form.Item>
                        <Form.Item label={'菜单图标'} name={'menuImgClass'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={'菜单路径'} name={'rule'}>
                            <Select mode={'tags'} options={[
                                {value:'welecome',label:'welcome'},
                                {value:'index/user',label:'index/user'},
                                {value:'index/admin',label:'index/admin'},
                                {value:'index/permission',label:'index/permission'},
                                {value:'index/role',label:'index/role'},
                                {value:'user/userlist',label:'user/userlist'},
                                {value:'user/edituser',label:'user/edituser'},
                                {value:'role/addrole',label:'role/addrole'},
                                {value:'role/roleinfo',label:'role/roleinfo'},
                                {value:'role/rolelist',label:'role/rolelist'},
                                {value:'permission/permissionlist',label:'permission/permissionlist'},
                                {value:'admin/adminlist',label:'admin/adminlist'},

                            ]}/>
                        </Form.Item>
                        <Form.Item label={'菜单路由'} name={'pathRoute'}>
                            <Select mode={'tags'} options={[
                                {value:'welecome',label:'welcome'},
                                {value:'user',label:'user'},
                                {value:'admin',label:'admin'},
                                {value:'permission',label:'permission'},
                                {value:'role',label:'role'},
                                {value:'userlist',label:'userlist'},
                                {value:'edituser',label:'edituser'},
                                {value:'addrole',label:'addrole'},
                                {value:'roleinfo',label:'roleinfo'},
                                {value:'rolelist',label:'rolelist'},
                                {value:'permissionlist',label:'permissionlist'},
                                {value:'adminlist',label:'adminlist'},

                            ]}/>
                        </Form.Item>
                        <Form.Item label={'父级权限id'}   name={'parentId'}>
                        <InputNumber/>
                        </Form.Item>
                        <Form.Item label={'权限id'}   name={'id'}><InputNumber/></Form.Item>
                        <Form.Item label={'父级权限树控key'}   name={'parentKey'}>
                            <Select options={[
                                {value:'0-0',label:'原始根节点0-0'},
                                {value:'0-0-0',label:'用户节点0-0-0'},
                                {value:'0-0-1',label:'权限节点0-0-1'},
                                {value:'0-0-2',label:'角色节点0-0-2'},
                                {value:'0-0-3',label:'管理员节点0-0-3'},
                            ]}/>
                        </Form.Item>

                        <Form.Item label={'权限树控key'}   name={'key'}>
                            <Select options={[
                                {value:'0-0-0',label:'子节点0-0-0'},
                                {value:'0-0-1',label:'子节点0-0-1'},
                                {value:'0-0-2',label:'子节点0-0-2'},
                                {value:'0-0-3',label:'子节点0-0-3'},
                                {value:'0-0-0-0',label:'用户子节点0-0-0-0'},
                                {value:'0-0-0-1',label:'用户子节点0-0-0-1'},
                                {value:'0-0-0-2',label:'用户子节点0-0-0-2'},
                                {value:'0-0-0-3',label:'用户子节点0-0-0-3'},
                                {value:'0-0-0-4',label:'用户子节点0-0-0-4'},
                                {value:'0-0-0-5',label:'用户子节点0-0-0-5'},
                                {value:'0-0-0-6',label:'用户子节点0-0-0-6'},
                                {value:'0-0-0-7',label:'用户子节点0-0-0-7'},
                                {value:'0-0-1-0',label:'权限子节点0-0-1-0'},
                                {value:'0-0-1-1',label:'权限子节点0-0-1-1'},
                                {value:'0-0-1-2',label:'权限子节点0-0-1-2'},
                                {value:'0-0-1-3',label:'权限子节点0-0-1-3'},
                                {value:'0-0-1-4',label:'权限子节点0-0-1-4'},
                                {value:'0-0-1-5',label:'权限子节点0-0-1-5'},
                                {value:'0-0-1-6',label:'权限子节点0-0-1-6'},
                                {value:'0-0-1-7',label:'权限子节点0-0-1-7'},
                                {value:'0-0-2-0',label:'角色子节点0-0-2-0'},
                                {value:'0-0-2-1',label:'角色子节点0-0-2-1'},
                                {value:'0-0-2-2',label:'角色子节点0-0-2-2'},
                                {value:'0-0-2-3',label:'角色子节点0-0-2-3'},
                                {value:'0-0-2-4',label:'角色子节点0-0-2-4'},
                                {value:'0-0-2-5',label:'角色子节点0-0-2-5'},
                                {value:'0-0-2-6',label:'角色子节点0-0-2-6'},
                                {value:'0-0-3-0',label:'管理员子节点0-0-3-0'},
                                {value:'0-0-3-1',label:'管理员子节点0-0-3-1'},
                                {value:'0-0-3-2',label:'管理员子节点0-0-3-2'},
                                {value:'0-0-3-3',label:'管理员子节点0-0-3-3'},
                                {value:'0-0-3-4',label:'管理员子节点0-0-3-4'},
                                {value:'0-0-3-5',label:'管理员子节点0-0-3-5'},
                                {value:'0-0-3-6',label:'管理员子节点0-0-3-6'},
                                {value:'0-0-3-7',label:'管理员子节点0-0-3-7'},

                            ]}/>
                        </Form.Item>


                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type={'primary'} htmlType={'submit'}>
                                    添加权限
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
export default inject('permission')(observer(AddPermission))