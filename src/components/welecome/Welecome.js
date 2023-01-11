import React from 'react'
import styled from 'styled-components'
import 'animate.css'

const StyleDiv = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background: skyblue;
  opacity: ${props => props.opacity};
  animation:animate ease-in-out 20s infinite;
  @keyframes animate {
    0%,50%
    {
      transform：translateX(-80px);
    }

  }
`
const StyleContainer = styled.div`
  margin-top:30px;
  box-sizing: border-box;
  position:relative;
  width:100%;
  height:100vh;
  overflow:hidden;
`
const StyleBubbles = styled.div`

  position:relative;
  display: flex;
`
//let i = 10
const StyleSpan = styled.span`
  position:relative;
  width:30px;
  height:30px;
  background:#4fc3dc;
  margin:0 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 10px #3fc3dc44,
  0 0 50px #4fc3dc,
  0 0 100px #4fc3dc;
  //animation-duration: var(--i);
  animation: animate 4s linear infinite;
 // animate-duration: calc(10s / var(i)) ;
  
  @keyframes animate
  {
    0%
    {
      transform:translateY(100vh) scale(0)
      
    }
    100%
    {
      transform:translateY(-10vh) scale(1);
    }
    
  }
  :nth-child(1){
    background:#ff2d75;
    box-shadow: 0 0 0 10px #ff2d44,
    0 0 50px #ff2d75,
    0 0 100px #ff2d75;
    animation: animate 3s linear infinite;
  }
  :nth-child(2){
    background:#ff2d75;
    box-shadow: 0 0 0 10px #ff2d44,
    0 0 50px #ff2d75,
    0 0 100px #f36d75;
    animation: animate 13s linear infinite;
  }
  :nth-child(3){
    background:#ff2d75;
    box-shadow: 0 0 0 10px #ff2d44,
    0 0 50px #ff2d75,
    0 0 100px #f2f2f275;
    animation: animate 1s linear infinite;
  }
  :nth-child(4){
    background:#012d75;
    box-shadow: 0 0 0 10px #ff2d44,
    0 0 50px #f02d75,
    0 0 100px #ff2d75;
    animation: animate 2.7s linear infinite;
  }  
  :nth-child(5){
    background:#012d75;
    box-shadow: 0 0 0 10px #af2d44,
    0 0 50px #f04445,
    0 0 100px #ff2d75;
    animation: animate 6s linear infinite;
  }
  :nth-child(6){
    background:#012d75;
    box-shadow: 0 0 0 10px #af2d44,
    0 0 300px #f06645,
    0 0 100px #ff2d75;
    animation: animate 27s linear infinite;
  }
  :nth-child(7){
    background:#012d75;
    box-shadow: 0 0 0 10px #af2d44,
    0 0 200px #f06645,
    0 0 100px #ff2d75;
    animation: animate 3s linear infinite;
  }
  :nth-child(8){
    background:#012d75;
    box-shadow: 0 0 0 10px #af2d44,
    0 0 400px #f06645,
    0 0 100px #ff2d75;
    animation: animate 20s linear infinite;
  }
`


const title = 'welcome'



//有一个状态type 1,2,3
//返回标签不同
//复杂的，集合成函数



//阻止默认事件
//e.preventDefault();




class Welecome extends React.Component{
    //const animaDom = useRef<HTMLDivElement>(null!)

    //初始化----------------------------------------------------------------
    constructor(props) {
        super(props);
        this.state={
            width:0,
            height:0,
            opacity:0
        }
        //使用bind前行修改
        this.handler = this.handler.bind(this)

    }


    //类状态---------------------------------------------------------------------
    //定义组件状态,渲染，用this.
    //不允许直接修改，使用不改变原数据的值
    state = {
        //
        loading:false,
        setLoading:false,
        name:'cp teacher',
        count:0,
        person:{
            name:'Jack',
            age:18
        },
        list:[1,2,3]

    }

    //类生命周期组件加载完成后调用-----------------------------------------------------
    componentDidMount() {
        //console.log('hhhh')
    }
    //类方法------------------------------------------------------------------------
    trigger = (e,msg)=>{
        //阻止默认事件
         //e.preventDefault(); 阻止了a 的 href跳转功能
        console.log(msg)
        e.preventDefault()
        //console.log('trigger')
    }

    changeName=()=>{
        //修改state的状态state，通过setState方法
        this.setState({
            name:'xuge'
        })

    }
    changeCount = ()=>{
        //修改state
        this.setState({
            count:this.state.count+1
        })

    }
    handler(){
        console.log(this)
        this.setState({
            //修改state中的array数组
            list:this.state.list.filter(item=>item !==2)
        })
    }
    handler1(){
        console.log(this)

        this.setState({
            //修改state中的array数据
            list:[...this.state.list,2222],
            //array数据删除

            //修改state中的object数据
            person:{
                ...this.state.person,
                name:'hhhh'
            }
        })
    }
    //类渲染----------------------------------------------------------------------
    render() {
        //条件渲染，
        return (
            <>


                    <h2>{title}欢迎访问管理系统！</h2>
                <br/>
                <br/>
                <hr/>
                <StyleContainer>
                    <StyleBubbles>

                        <StyleSpan i={12}></StyleSpan>
                        <StyleSpan i={13}></StyleSpan>
                        <StyleSpan i={15}></StyleSpan>
                        <StyleSpan i={60}></StyleSpan>
                        <StyleSpan i={10}></StyleSpan>
                        <StyleSpan i={12}></StyleSpan>
                        <StyleSpan i={13}></StyleSpan>
                        <StyleSpan i={15}></StyleSpan>
                        <StyleSpan i={60}></StyleSpan>
                        <StyleSpan i={10}></StyleSpan>



                    </StyleBubbles>
                </StyleContainer>



            </>
        )

        }
        btnClick() {
            this.setState({
                width: '100px',
                height: '100px',
                opacity: 1
            })
    }
}
export default Welecome