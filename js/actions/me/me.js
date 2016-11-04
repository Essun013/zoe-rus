/**
 * Created by sea35 on 2016/10/17.
 */

const LOGIN_SYS = 'LOGIN_SYS';
const SET_USER = 'SET_USER';
const SET_CHILDBIRTH ='SET_CHILDBIRTH';

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

function setChildbirth(childbirth) {
    return {
        type:SET_CHILDBIRTH,
        childbirth
    }
}

module.exports ={
    loginSys,
    setUser,
    setChildbirth,
    LOGIN_SYS,
    SET_USER,
    SET_CHILDBIRTH
}