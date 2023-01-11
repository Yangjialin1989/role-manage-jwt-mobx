import {Component} from 'react'
import {Input, Table, Popconfirm,message,} from 'antd'

import {inject,observer} from 'mobx-react'

const {Search} = Input

class RoleList extends Component{

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getInfo()
    }
    getInfo=()=>{
        this.props.user.userlist1().then(data=>{
            this.setState({
                list:data.data
            })
            console.log(data.data)
        }


            )


    }
    handleDelete = async (record)=>{
        console.log(typeof(record))
        await this.props.user.userdelete({id:record})
        this.getInfo()
    }
    state = {
        list:[],
        columns:[
            {
                title:'任务编码',
                dataIndex:'id',
                key:'id'
            },{
                title:'注册用户',
                dataIndex:'name',
                key:'name'
            },{
                title:'邮箱',
                dataIndex:'email',
                key:'email'
            },{
                title:'电话',
                dataIndex:'telephone',
                key:'telephone'
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
    onShowSizeChange(current){
        console.log(current)
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
    render() {
        let paginationProps;
        paginationProps ={
            current:1,
                pageSize:10,
                total:1000,
                showSizeChanger:this.onShowSizeChange

        }
        return (
            <>
                <h2>角色列表</h2>
                <Search onChange={this.onChange} allowClear  onSearch={this.onSearch} size={'large'}></Search>

                    <Table pagination={this.paginationProps}  loading={this.state.list.length !== 0 ? false : true} dataSource={this.state.list} columns={this.state.columns}>

                </Table>

            </>
        )
    }
}
export default inject('user')(observer(RoleList))