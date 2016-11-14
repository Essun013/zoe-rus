/**
 * Created by sea35 on 2016/11/11.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    StyleSheet,
    Image,
    TextInput,
    View,
    Text,
    PixelRatio,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

class Remind extends Component {
    constructor(props){
        super(props);
        this.state={
            newMessage:false,
            productionCheck:false
        }
    }
    newMessageButClick(){
        if(this.state.newMessage){
            this.setState({newMessage:false});
        }else {
            this.setState({newMessage:true});
        }
    }
    checkButClick(){
        if(this.state.productionCheck){
            this.setState({productionCheck:false});
        }else {
            this.setState({productionCheck:true});
        }
    }
    render() {
        return (
             <ScrollView style={styles.mainContainer}>
                <View style={styles.viewRow}>
                    <View style={styles.leftCell}>
                       <Text style={styles.title}> {'新消息通知'}</Text>
                    </View>
                    <View style={styles.rightCell}>
                        <TouchableOpacity onPress={this.newMessageButClick.bind(this)}>
                            <Image style={styles.imgBut} source={this.state.newMessage?require('./img/on.png'):require('./img/off.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                 <View style={[styles.viewRow,{backgroundColor:'#f5f5f5',height: 30}]}>
                     <View style={[styles.rightCell]}>
                         <Text style={[styles.title,{color:'#989898'}]}> {'关闭后，将无法收到相消息'}</Text>
                     </View>
                 </View>
                 <View style={styles.viewRow}>
                     <View style={styles.leftCell}>
                         <Text style={styles.title}> {'产检提醒'}</Text>
                     </View>
                     <View style={styles.rightCell}>
                         <TouchableOpacity onPress={this.checkButClick.bind(this)}>
                             <Image style={styles.imgBut} source={this.state.productionCheck?require('./img/on.png'):require('./img/off.png')}/>
                         </TouchableOpacity>
                     </View>
                 </View>
             </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    viewRow:{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        marginTop:5,
        height: 50
    },
    leftCell:{
        flex:1,
        marginLeft:10,
        justifyContent: 'center',
    },
    rightCell:{
        flex:1,
        marginRight:10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    title:{
        fontSize:15
    },
    imgBut:{
      width: 42,
      height:24
    }
})

export default Remind;