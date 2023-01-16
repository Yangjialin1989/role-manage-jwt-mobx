import React from 'react';
import { Button, Result } from 'antd';
import history from '../../utils/history'
import cookie from "react-cookies";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0
        }
    }



    timer = null
    componentWillUnmount() {
        console.log('interval')
        clearInterval(this.timer)
    }

    componentDidMount() {
        let exp = parseInt(cookie.load('exp')-Date.parse(new Date())/1000)
        //console.log(cookie.load('exp'))
        this.timer = setInterval(() => {


            this.setState({
                count: exp -= 1
            })


        }, 1000)
    }


    render() {

        return (
            <>
                <Result
                    //status="401"
                    title="错误码：4011"
                    subTitle={`您暂时没有权限访问。令牌将于${this.state.count}s过期，请重新登录`}
                    extra={<Button type="primary" onClick={() => {
                        cookie.remove('exp')
                        cookie.remove('difference')
                        history.replace('/login')
                        history.go(0)

                    }}>重新登录</Button>}
                />
            </>
        )


    }

}
export default App;