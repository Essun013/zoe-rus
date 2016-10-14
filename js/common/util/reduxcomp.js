/**
 * Created by ianchen on 16/10/14.
 */

const {connect} = require('react-redux');

module.exports = {reduxcomp: (component, select?: func, dispatch?: func) => {
    if (select && dispatch)
        return connect(select, dispatch)(component)
    else if (select)
        return connect(select)(component);
}}