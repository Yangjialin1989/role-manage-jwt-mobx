import React from 'react';
import { Button, Result } from 'antd';
import history from '../../utils/history'


const App = () => (
    <Result
        //status="401"
        title="错误码：401"
        subTitle="您暂时没有权限访问。令牌已过期，请重新登录"
        extra={<Button type="primary" onClick={()=>{
            history.replace('/login')
            history.go(0)
        }}>重新登录</Button>}
    />
);
export default App;