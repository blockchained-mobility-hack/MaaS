import React, { Component } from 'react'
import styled from 'styled-components'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import DatePicker from 'material-ui-pickers/DatePicker'
import Location from './Location'

const AppContainer = styled.div`
    text-aligned: 'center';
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
    padding: 10px;
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

class App extends Component {
    state = {
        selectedDate: new Date(),
        fromLocation: 'munich',
        destination: 'berlin',
    }
    handleDateChange = () => {
        alert('changed')
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
                                handleChange={e => console.log(e)}
                                iden="start-location"
                            />
                        </ControlSection>
                        <ControlSection>
                            <ControlLabel>Destination: </ControlLabel>
                            <Location
                                location={this.state.destination}
                                handleChange={e => console.log(e)}
                                iden="end-location"
                            />
                        </ControlSection>
                    </ContentContainer>
                </AppContainer>
            </MuiPickersUtilsProvider>
        )
    }
}

export default App
