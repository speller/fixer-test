import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './styles.scss'
import { Avatar, Button, FormControl, Input, InputLabel, Paper, Typography } from '@material-ui/core'
import { MODE_LOGIN } from './constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoginForm extends Component {
  
  static propTypes = {
    mode: PropTypes.string.isRequired,
  }
  
  render () {
    const props = this.props;
    
    return (
      <div className="login-form">
        <Paper className="paper">
          <Avatar className="avatar">
            <FontAwesomeIcon icon="lock" />
          </Avatar>
          <Typography component="h1" variant="h5">
            {props.mode === MODE_LOGIN ? "Login" : "Register"}
          </Typography>
          <form className="form">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              {props.mode === MODE_LOGIN ? "Login" : "Register"}
            </Button>
          </form>
        </Paper>
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
)(LoginForm)