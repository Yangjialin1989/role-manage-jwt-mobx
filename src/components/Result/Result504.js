import React from 'react';
import { Button, Result } from 'antd';
import history from '../../utils/history'
const App = () => (
    <Result
        status="warning"
        title="网络错误，请检查网络连接是否正确。"
        extra={
            <Button type="primary" key="console" onClick={()=>{
                history.replace('/login')
                window.location.reload()
            }
            }>
                重新登录
            </Button>
        }
    />
);
export default App;