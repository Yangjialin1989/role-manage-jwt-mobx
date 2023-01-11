//
// import './App.css';
// import {BrowserRouter as Router,useLocation,useNavigate,useRoutes} from "react-router-dom";
// import PrivateRouter from "../components/PrivateRoute";
// function App() {
//   return (
//     <Router>
//         <PrivateRouter/>
//     </Router>
//   );
// }
//
// export default App;
//////////////////////////////////////////////////////////////////////////////////////
import './App.css';
//import {BrowserRouter as Router,useLocation,useNavigate} from "react-router-dom";
import {HashRouter as Router,useLocation,useNavigate} from "react-router-dom";
import PrivateRouter from "../components/PrivateRoute";
import {useEffect} from "react";
import history from '../utils/history'
import {message} from "antd";
import Login from './Login'
import Home from './Home'
function ToIndex(){
    const navigateTo = useNavigate()

    //jsx组件，有div,加载完实现跳转,下面模拟生命周期
    useEffect(()=>{
        //
        navigateTo('/index')
        //message.warning('您已经登录过了！')

    },)
    return <Home/>
}
function ToLogin(){
    const navigateTo = useNavigate()
    useEffect(()=>{
       // let token = sessionStorage.getItem('token')

        navigateTo('/login')
        message.warning('您还没有登录，请登录后再访问！')
    })
    return <Login/>
}

function BeforeRouterEnter(){
    const location = useLocation()
    let token = window.localStorage.getItem('token')
    if(location.pathname === '/login' && token){
        return <ToIndex/>
    }
    if(location.pathname !== '/login' && !token){
        return <ToLogin/>
    }




    return <PrivateRouter/>
}


function App() {
  return (
      <div>

    <Router history={history}>

        <BeforeRouterEnter></BeforeRouterEnter>

    </Router>






      </div>

  );
}

export default App;
