import {Component} from 'react'

import {Outlet} from "react-router-dom";

class PermissionManger extends Component{
    render() {
        return (
            <>
                <h2>角色管理</h2>
                <Outlet></Outlet>
            </>
        )
    }
}
export default PermissionManger