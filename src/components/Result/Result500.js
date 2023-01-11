import React from 'react';
import { Button, Result } from 'antd';
import history from '../../utils/history'


const App = () => (
    <Result
        status="500"
        title="错误码：500"
        subTitle="网络请求错误，请稍后再试。"
        extra={<Button type="primary" onClick={()=>{
            history.replace('/index')
            history.go(0)
        }}>返回首页</Button>}
    />
);
export default App;