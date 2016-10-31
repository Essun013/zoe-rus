/**
 * Created by sea35 on 2016/10/17.
 */

const LOGIN_SYS = 'LOGIN_SYS';
const SET_USER = 'SET_USER';

function loginSys(loginState) {
    return {
        type: LOGIN_SYS,
        loginState

    }
}

function setUser(user) {
    return {
        type:SET_USER,
        user
    }
}

module.exports ={
    loginSys,
    setUser,
    LOGIN_SYS,
    SET_USER
}