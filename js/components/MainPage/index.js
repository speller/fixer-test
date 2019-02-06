import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { loadData } from './actions'
import './styles.scss'
import LinearProgress from '@material-ui/core/LinearProgress'

class MainPage extends Component {
  
  static defaultProps = {
    rows: [],
    inProgress: false,
  }
  
  state = {
    from: 20171,
    to: 20172,
    prefCode: 13,
    cityCode: 13101,
  }
  
  componentDidMount () {
    this.doLoadData()    
  }
  
  doLoadData() {
    const state = this.state
    this.props.loadData(
      state.from,
      state.to,
      state.prefCode,
      state.cityCode,
    )    
  }

  render () {
    const props = this.props
    const state = this.state
    const numFmt = new Intl.NumberFormat('ja-JP', {currency: 'JPY', style: 'currency', currencyDisplay: 'symbol'})
    
    return (
      <div className="main-page">
        {props.inProgress &&
        <LinearProgress/>}
        <Paper className="paper">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Period</TableCell>
                <TableCell>Prefecture</TableCell>
                <TableCell>City</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell>Floor Plan</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="right">{String(row.period).substring(0, 4)}&nbsp;Q{String(row.period).substr(4)}</TableCell>
                  <TableCell>{row.prefName}</TableCell>
                  <TableCell>{row.cityName}</TableCell>
                  <TableCell align="right">{row.buildingYear}</TableCell>
                  <TableCell>{row.floorPlan}</TableCell>
                  <TableCell align="right">{numFmt.format(row.tradePrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>      
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
      loadData: (from, to, prefCode, cityCode) => 
        dispatch(loadData(from, to, prefCode, cityCode)),
    }
  },
)(MainPage)