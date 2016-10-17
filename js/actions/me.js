/**
 * Created by sea35 on 2016/10/17.
 */

export const UPDATE_ME = 'UPDATE_ME';

export function updateMe(meModel) {
    return { type: UPDATE_ME, meModel }
}