import React from 'react';
import { Button, Result } from 'antd';
import history from '../../utils/history'


const App = () => (
    <Result
        status="403"
        title="错误码：403"
        subTitle="登录过期，请重新登录"
        extra={<Button type="primary" onClick={()=>{
            history.replace('/login')
            history.go(0)
        }}>返回首页</Button>}
    />
);
export default App;