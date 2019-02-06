import React, { Component } from 'react'
import { connect } from 'react-redux'

class MainPage extends Component {
  render () {
    return (
      <div>
        Main Page
      </div>
    )
  }
}

export default connect(
  // Map store state to our component props
  (state) => {
    const myState = state['mainPage'] || {}
    return {...myState}
  },
  // Add actions methods to our component props
  (dispatch) => {
    return {
    }
  },
)(MainPage)