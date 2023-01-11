import React from 'react';
import { Button, Result } from 'antd';
import history from '../../utils/history'


const App = () => (
    <Result
        status="404"
        title="错误码：404"
        subTitle="网络请求不存在"
        extra={<Button type="primary" onClick={()=>{
            history.replace('/index')
            history.go(0)
        }}>返回首页</Button>}
    />
);
export default App;