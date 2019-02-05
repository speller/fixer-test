import 'regenerator-runtime/runtime'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppBar, Button, CssBaseline, Toolbar, Typography } from '@material-ui/core'
import './styles.scss'
import LoginForm from '../LoginForm'
import { PAGE_LOGIN, PAGE_MAIN, PAGE_REGISTER } from './constants'
import { showLoginPage, showRegisterPage } from './actions'
import { MODE_LOGIN, MODE_REGISTER } from '../LoginForm/constants'

class Root extends Component {
  
  static defaultProps = {
    page: PAGE_MAIN,
  }
  
  render () {
    const props = this.props;
    
    return (
      <div className="app-root">
        <CssBaseline />
        <AppBar position="static" color="default" className="app-bar">
          <Toolbar className="toolbar-title">
            <Typography variant="h6" color="inherit" noWrap className="title">
              Property Transactions
            </Typography>
            <Button className="main-link">
              Main Page
            </Button>
            <Button color="primary" variant="outlined" className="login" onClick={props.showLoginPage}>
              Login
            </Button>
            <Button color="primary" variant="outlined" onClick={props.showRegisterPage}>
              Register
            </Button>
          </Toolbar>
        </AppBar>
        <main className="layout">
          {props.page === PAGE_REGISTER &&
            <LoginForm mode={MODE_REGISTER}/>
          }      
          {props.page === PAGE_LOGIN &&
            <LoginForm mode={MODE_LOGIN}/>
          }      
        </main>
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
      showLoginPage: () => dispatch(showLoginPage()),
      showRegisterPage: () => dispatch(showRegisterPage()),
    }
  },
)(Root)