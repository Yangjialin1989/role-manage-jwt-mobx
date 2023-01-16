# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```
1.用户信息表
{
        id: 7,
        name: 'hhh',
        userHeader: 'Cat.png',
        RoleId: 1
    }

2.菜单表
[{
        menuId: 1,
        menuName: '欢迎',
        menuUrl: 'welecome',
        pathRoute: 'welecome',
        componentPath: 'welecome/Welecome',
        menuImgClass: 'SmileOutlined',
        pId: 0,
        menuState: '0',
        isContainChildren: false,
        menuChilds: []
    }, {
        menuId: 2,
        menuName: '用户管理',
        menuUrl: 'index/user',
        pathRoute: 'user',
        componentPath: 'user/UserManger',
        menuImgClass: 'TeamOutlined',
        pId: 0,
        menuState: '0',
        isContainChildren: false,
        menuChilds: [{
            menuId: 10,
            menuName: '用户列表',
            menuUrl: 'user/userlist',
            pathRoute: 'userlist',
            componentPath: 'user/UserList',
            menuImgClass: 'InsertRowAboveOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            meta:{
                superAdmin:true
            },
            menuChilds: []
        }, {
            menuId: 11,
            menuName: '修改用户',
            menuUrl: 'user/edituser',
            pathRoute: 'edituser',
            componentPath: 'user/EditUser',
            menuImgClass: 'UserSwitchOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }]
    }, {
        menuId: 3,
        menuName: '角色管理',
        menuUrl: 'index/role',
        pathRoute: 'role',
        componentPath: 'role/RoleManger',
        menuImgClass: 'IdcardOutlined',
        pId: 0,
        menuState: '0',
        isContainChildren: true,
        menuChilds: [{
            menuId: 7,
            menuName: '添加角色',
            menuUrl: 'role/addrole',
            pathRoute: 'addrole',
            componentPath: 'role/AddRole',
            menuImgClass: 'UserAddOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }, {
            menuId: 8,
            menuName: '角色详情',
            menuUrl: 'role/roleinfo',
            pathRoute: 'roleinfo',
            componentPath: 'role/RoleInfo',
            menuImgClass: 'SolutionOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }, {
            menuId: 9,
            menuName: '角色列表',
            menuUrl: 'role/rolelist',
            pathRoute: 'rolelist',
            componentPath: 'role/RoleList',
            menuImgClass: 'InsertRowAboveOutlined',
            pId: 2,
            menuState: '0',
            isContainChildren: false,
            menuChilds: []
        }]
    },

    ]
3.权限表permission
{
    apiPath:'/role/update/:roleId',
    createdAt:'2021-04-09 12:33:15',
    dataedAt:'',
    id:5,
    isMenu:0,
    method:'DELETE',
    parentId:3
    path:'deleteRole',
    rule:'',
    title:'删除角色‘,
    updatedAt:'2021-04-09 12:33:33'
    
}
4.角色表


```


基本功能
1.登录 /login    不jwt验证,其他路由全部需要jwt验证
    服务器返回token，refresh_token , 客户端存储两个token，
    token 用户数据请求
    refresh_token用于token过期刷新,返回客户端refresh_token过期时间
    refresh_token小于60s,提示即将过期，重新登录
2.登出
    销毁
3.用户crud
4.角色crud
5.权限crud






扩展功能： 
1.用户之间的通信   socket.io https://socket.io/


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
