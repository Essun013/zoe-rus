/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import Find from './Find';
import Nav from '../../components/Nav/Nav';

class FindNav extends Component {

    constructor(props) {
        super(props);
        this.navBarRightBottom = this.navBarRightBottom.bind(this);
    }

    navBarRightBottom(route, navigator, index, navState) {

    }

    render() {
        var reduxArgs = this.props.reduxArgs;

        var rightBotton = this.navBarRightBottom;
        if (reduxArgs.text)
            rightBotton = (route, navigator, index, navState) => {return reduxArgs.text}

        return <Nav route={{component: Find, title: '发现'}} rightButton={rightBotton} />
    }
}

function select(state) {
    return {
        reduxArgs: state.findX.reduxArgs
    }
}

const {connect} = require('react-redux');

module.exports = connect(select)(FindNav);