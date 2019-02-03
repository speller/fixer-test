import 'regenerator-runtime/runtime'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import 'typeface-roboto'


class Root extends Component {
  render () {
    return (
      <div>
        
      </div>
    )
  }
}

export default connect(
  // Map store state to our component props
  (state) => {
    const myState = state['root'] || {}
    return {...myState}
  },
  // Add actions methods to our component props
  (dispatch) => {
    return {
      // loadOwnerPropertiesData: (auth, lang) =>
      //   dispatch(loadOwnerPropertiesData(auth, lang)),
    }
  },
)(Root)