import {Component} from 'react'
import {Input, Table, Popconfirm, message, Button,} from 'antd'

import {inject,observer} from 'mobx-react'
import AddPermission from "./AddPermission";
import PermissionTable from "../Table/PermissionTable";
const {Search} = Input

class PermissionList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            visibeAddRoleModal:false,
            list:[],
            columns:[
                {
                    title:'权限名称',
                    dataIndex:'title',
                    key:'title'
                },{
                    title:'接口路径',
                    dataIndex:'apiPath',
                    key:'apiPath'
                },{
                    title:'请求方法',
                    dataIndex:'method',
                    key:'method'
                },{
                    title:'菜单路径',
                    dataIndex:'rule',
                    key:'rule'
                },{
                    title:'创建日期',
                    dataIndex:'createdAt',
                    key:'createdAt'
                },{
                    title:'更新日期',
                    dataIndex:'updatedAt',
                    key:'updatedAt'
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
        this.props.permission.list().then(data=>{
            this.setState({
                list:data.data
            })
            console.log(data.data)
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
            let res = await this.props.role.search({name: ''})
            if (res.data.length === 0) {
                message.info('没有查询到数据')
            } else {
                //message.success('查询成功')
                this.setState({
                    list: res.data[0]
                })
            }
        }else{
            let res = await this.props.role.search({name: value.trim()})
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
            this.getInfo()
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
                <AddPermission open={this.state.visibeAddRoleModal}
                         callback={this.hideAddRoleModal}
                ></AddPermission>
                <Button onClick={this.showAddRoleModal} type={'primary'}>添加权限</Button>
                {/*<Search onChange={this.onChange} allowClear  onSearch={this.onSearch} size={'large'}></Search>*/}

                {/*    <Table pagination={this.paginationProps}  loading={this.state.list.length !== 0 ? false : true} dataSource={this.state.list} columns={this.state.columns}>*/}

                {/*</Table>*/}
                <hr/>
                <PermissionTable callback={this.hideAddRoleModal}></PermissionTable>

            </>
        )
    }
}
export default inject('permission')(observer(PermissionList))