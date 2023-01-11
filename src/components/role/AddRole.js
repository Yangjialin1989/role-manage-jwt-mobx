import React from 'react'
import {Button} from "antd";
//context 组件通信
const {Provider,Consumer} = React.createContext()
function A({children}){

    return (
        <div>A</div>
    )
}
function C(props){
    //const theme = React.useContext(value)
    return (

            <Consumer>

                {value => (
                    <>
                        <h2>C</h2>

                        {value.message}


                        <hr/>
                        {value[0].list.map(item=>(
                            <div style={{display:'flex',height:'40px',lineHeight:'40px',
                                justifyContent:'space-between'}}>
                                <h3 style={{width:'50px'}}>{item.name}</h3>
                                <p style={{width:'40px'}}>{item.price}$</p>
                                <p style={{width:'180px'}}>{item.info}</p>
                                <Button onClick={()=>value[1](item.id)}>Delete</Button>
                            </div>
                        ))

                        }

                    </>
                    )}
           </Consumer>



    )
}
class AddRole extends React.Component{
    constructor(props){
        super(props)
        this.state={
            message:'this is message ',
            list:[
                {id:1,name:'苹果',price:18.8,info:'开业大吉，8折扣'},
                {id:2,name:'香蕉',price:45.5,info:'开业大吉，8折扣'},
                {id:3,name:'火龙果',price:678.7,info:'开业大吉，8折扣'},
                {id:4,name:'橘子',price:90.8,info:'开业大吉，8折扣'},
            ]
        }

    }
    Delete=(id)=>{
        console.log(id)
        this.setState({
            list:this.state.list.filter(item=>item.id !== id)
        })
    }


    render() {

        return (


                <Provider value={[this.state,this.Delete]}>

                    {
                    <div>
                        <h2>添加角色</h2>
                        <A></A>
                        <C>

                        </C>

                        <div>
                            {this.state.list.map(item=>(
                                <>
                                    <hr/>
                                    <div style={{display:'flex',height:'40px',lineHeight:'40px',
                                        justifyContent:'space-between'}}>
                                        <h3 style={{width:'50px'}}>{item.name}</h3>
                                        <p style={{width:'40px'}}>{item.price}$</p>
                                        <p style={{width:'180px'}}>{item.info}</p>
                                        <Button>Delete</Button>
                                    </div>

                                </>

                            ))}

                        </div>

                    </div> }

                </Provider>


        )
    }
}
export default AddRole