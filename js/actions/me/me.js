/**
 * Created by sea35 on 2016/10/17.
 */

export const UPDATE_ME = 'UPDATE_ME';

export function updateMe(user,loginState) {
    return {
        type: UPDATE_ME,
        user,
        loginState

    }
}