import userStore from "./userStore";
import adminStore from "./adminStore";
import uploadStore from "./uploadStore";
import roleStore from "./roleStore";
import permissionStore from "./permissionStore";
//userStore 是class类，我们需要new实例使用，暴露也是内的实例
const obj = {
    user:new userStore(),
    admin:new adminStore(),
    upload:new uploadStore(),
    role:new roleStore(),
    permission:new permissionStore()
}
export default obj


