import React, {Component} from 'react'
import {connect} from 'react-redux'

class FilterBar extends Component {
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
    }
  },
)(FilterBar)