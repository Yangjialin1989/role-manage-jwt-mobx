import userStore from "./userStore";
import adminStore from "./adminStore";
import uploadStore from "./uploadStore";
//userStore 是class类，我们需要new实例使用，暴露也是内的实例
const obj = {
    user:new userStore(),
    admin:new adminStore(),
    upload:new uploadStore()
}
export default obj


