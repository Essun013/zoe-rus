import React, { PropTypes } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { connect } from 'react-redux'

import { Counters, Counter } from '../../components'
import * as actions from './actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const renderCounters = (counters, props) => {
  Alert.alert('title', JSON.stringify(counters));
  return <Counter
      key={1}
      decrementFn={() => props.dispatch(actions.decrement(1))}
      incrementFn={() => props.dispatch(actions.increment(1))}
      incrementWithDelayFn={() => props.dispatch(actions.incrementWithDelay(1))}>
    {counters[1]}
  </Counter>
}

const App = (props) => {
  const {
    counters
  } = props

  return (
    <View style={styles.container}>
      <Counters addFn={() => props.dispatch(actions.newCounter())}>
        {renderCounters(counters, props)}
      </Counters>
    </View>
  )
}

// App.displayName = 'App'

//it is a good practice to always indicate what type of props does your component
//receive. This is really good for documenting and prevent you from a lot of bug during
//development mode. Remember, all of these will be ignored once you set it to production.
App.propTypes = {
  counters: PropTypes.object.isRequired,
}

//Here's the most complex part of our app. connect is a function which selects,
//which part of our state tree you need to pass to your component. also, since
//my App component is pure function, i am injecting addNewCounter, increment and
//decrement functions wrapped with dispatch. I think this is the best and cleanest
//way to seperate your connect and your pure function.
export default connect(
  (state) => ({
    counters: state.app.counters
  })
)(App)
