import React, { Component } from 'react'
import styled from 'styled-components'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import DatePicker from 'material-ui-pickers/DatePicker'
import Location from './Location'
import Button from '@material-ui/core/Button'

import { Link } from 'react-router-dom'

const AppContainer = styled.div`
    text-align: center;
`
const Header = styled.div`
    background-color: #222;
    height: 80px;
    padding: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ContentContainer = styled.div`
    padding: 50px 10px;
`
const H1 = styled.h1`
    font-size: 1.5em;
`
const ControlSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ControlLabel = styled.p`
    width: 30%;
`

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 50px;
`

class App extends Component {
    state = {
        selectedDate: new Date(),
        fromLocation: 'munich',
        destination: 'berlin',
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }
    handleLocationChange = (field, value) => {
        this.setState({ [field]: value })
    }
    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <AppContainer>
                    <Header>
                        <H1>Next Generation Mobility</H1>
                    </Header>
                    <ContentContainer>
                        <ControlSection>
                            <ControlLabel>Date: </ControlLabel>
                            <DatePicker value={this.state.selectedDate} onChange={this.handleDateChange} />
                        </ControlSection>
                        <ControlSection>
                            <ControlLabel>Location: </ControlLabel>
                            <Location
                                location={this.state.fromLocation}
                                handleChange={ev => this.handleLocationChange('fromLocation', ev.target.value)}
                                iden="start-location"
                            />
                        </ControlSection>
                        <ControlSection>
                            <ControlLabel>Destination: </ControlLabel>
                            <Location
                                location={this.state.destination}
                                handleChange={ev => this.handleLocationChange('destination', ev.target.value)}
                                iden="end-location"
                            />
                        </ControlSection>
                        <ButtonGroup>
                            <Link to="/offer/cheap">
                                <Button style={{ width: '100%' }} size="large" color="primary" variant="contained">
                                    Cheapest
                                </Button>
                            </Link>
                            <p>Or</p>
                            <Link to="/offer/fast">
                                <Button style={{ width: '100%' }} size="large" color="primary" variant="contained">
                                    Fastest
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </ContentContainer>
                </AppContainer>
            </MuiPickersUtilsProvider>
        )
    }
}

export default App
