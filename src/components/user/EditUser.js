import {Component} from 'react'
import Comment from "../Comment/Comment";
import {Button} from "antd";

//子组件
function SunA(props){
    return (<>
        <div>A</div>
        <span>{props.B}</span>
        <Button onClick={()=>props.getSonMsg('子组件的内容')}>传递数据给父</Button>
    </>)
}
//子组件
function SunB({getSonMsg,getB,child,name,getMsg}){
    return (<>
        <div>B</div>
        <Button onClick={()=>getSonMsg('子组件的内容')}>传递数据给父</Button>
        <Button onClick={()=>getB('子A组件的内容')}>传递数据给子A</Button>
    </>)
}


class EditUser extends Component{
    state = {
        name:'farder name',
        B:''
    }
    getMsg = ()=>{
        console.log('父组件方法')
    }
    getSonMsg = (sun)=>{
        console.log(sun)
    }
    getB=(B)=>{
        console.log(B)
        this.setState({
            B:B
        })
    }
    render() {
        return (
            <>
                <SunA B={this.state.B} getSonMsg={this.getSonMsg} child={<span>121221</span>} name={this.state.name} getMsg={this.getMsg}></SunA>
                <SunB getB={this.getB} getSonMsg={this.getSonMsg} child={<span>121221</span>} name={this.state.name} getMsg={this.getMsg}></SunB>

                <h2>修改用户</h2>
                <Comment child={<span>121221</span>} name={this.state.name} getMsg={this.getMsg}></Comment>
            </>
        )
    }
}
export default EditUser