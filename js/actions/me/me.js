/**
 * Created by sea35 on 2016/10/17.
 */

export const LOGIN_SYS = 'LOGIN_SYS';

export function loginSys(user,loginState) {
    return {
        type: LOGIN_SYS,
        user,
        loginState

    }
}