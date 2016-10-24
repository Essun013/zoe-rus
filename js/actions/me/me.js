/**
 * Created by sea35 on 2016/10/17.
 */

const LOGIN_SYS = 'LOGIN_SYS';

function loginSys(loginState) {
    return {
        type: LOGIN_SYS,
        loginState

    }
}
module.exports ={
    loginSys,
    LOGIN_SYS
}