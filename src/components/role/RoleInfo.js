import React from 'react'
import PropTypes from "prop-types";
import {Button} from "antd";
import MyEditor from '../Editor'
class Test extends React.Component{
    timer =null
    componentDidMount() {
        console.log('Test 挂载')
        this.timer = setInterval(()=>{
            console.log('定时器开启')
        },1000)
    }
    componentWillUnmount() {
        console.log('test 销毁')
        clearInterval(this.timer)
    }

    render() {
        return (<div>Test component</div>);
    }
}
function List(prop){

    return(
        <div>
            <MyEditor></MyEditor>
        </div>
    )
}


List.propTypes = {
    name:PropTypes.string
}
class RoleInfo extends React.Component{
    state={
        list:"[9,9,0]",
        name:'2222',
        flag:true,
        msg:'隐藏Test'
    }

     testChange=()=>{
        this.setState({
            flag:!this.state.flag,
            msg:this.state.flag ? '显示Test' : '隐藏Test'

        })

     }
    render() {
        return (
            <>
                {this.state.flag ? <Test/> :null}
                <Button onClick={this.testChange}>{this.state.msg}</Button>
                <List name={this.state.name}></List>

            </>
        )
    }
}

export default RoleInfo