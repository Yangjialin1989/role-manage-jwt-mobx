import {Component} from 'react'
import {Input, Table, Popconfirm, message, Button,} from 'antd'

import {inject,observer} from 'mobx-react'
import AddRole from "./AddRole";
import EditTable1 from "../EditTable/EditTable1";
const {Search} = Input

class RoleList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            visibeAddRoleModal:false,
            list:[],
            columns:[
                {
                    title:'权限名称',
                    dataIndex:'roleName',
                    key:'roleName'
                },{
                    title:'权限列表',
                    dataIndex:'permissionList',
                    key:'permissionList'
                },{
                    title:'创建日期',
                    dataIndex:'createdAt',
                    key:'createdAt'
                },{
                    title:'操作',
                    dataIndex:'operation',
                    render: (_, record) =>
                        this.state.list.length >= 1 ? (
                            <Popconfirm title="Sure to delete?" onConfirm={()=>this.handleDelete(record.id)}>
                                <a>删除</a>
                            </Popconfirm>
                        ) : null,
                }

            ]
        }
    }
    componentDidMount() {
        this.getInfo()
    }
    getInfo=()=>{
        this.props.user.userpl().then(data=>{
            this.setState({
                list:data.data
            })
            //console.log(data.data)
        }


            )


    }
    handleDelete = async (record)=>{
        //console.log(typeof(record))
        await this.props.user.userdelete({id:record})
        this.getInfo()
    }

    onShowSizeChange(current){
        //console.log(current)
    }
    onSearch = async(value) => {
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
        if(value === '') {
            let res = await this.props.user.usersearch({name: ''})
            if (res.data.length === 0) {
                message.info('没有查询到数据')
            } else {
                //message.success('查询成功')
                this.setState({
                    list: res.data[0]
                })
            }
        }else{
            let res = await this.props.user.usersearch({name: value.trim()})
            if (res.data.length === 0) {
                message.info('没有查询到数据')
            } else {
                message.success('查询成功')
                this.setState({
                    list: res.data
                })
            }
        }

            //console.log(res.data)




    };
    onChange = (value)=>{
       //console.log(value)
    }
    showAddRoleModal = ()=>{
        this.setState({
            visibeAddRoleModal:true
        })
    }
    hideAddRoleModal = (refresh?:boolean)=>{
        if(refresh){
            this.getRoleList()
        }
        this.setState({
            visibeAddRoleModal:false
        })
    }
    render() {
      //  let paginationProps;
        // paginationProps ={
        //     current:1,
        //         pageSize:10,
        //         total:1000,
        //         showSizeChanger:this.onShowSizeChange
        //
        // }
        return (
            <>
                <h2>角色列表</h2>
                <AddRole open={this.state.visibeAddRoleModal}
                         callback={this.hideAddRoleModal}
                ></AddRole>
                <Button onClick={this.showAddRoleModal} type={'primary'}>添加角色</Button>
                <Search onChange={this.onChange} allowClear  onSearch={this.onSearch} size={'large'}></Search>

                    <Table pagination={this.paginationProps}  loading={this.state.list.length !== 0 ? false : true} dataSource={this.state.list} columns={this.state.columns}>

                </Table>
                <EditTable1></EditTable1>

            </>
        )
    }
}
export default inject('user')(observer(RoleList))