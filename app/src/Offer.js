import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import fetch from 'isomorphic-fetch'
import confirm from './confirm'

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}

const descriptionMap = {
    bmw:
        'In our five DriveNow German cities, you will be able to drive over 3,000 brand-new models from BMW and MINI. All of our cars are available for you around the clock, and ready to take you quickly and inexpensively from A to B. Register for DriveNow and start driving in your city..',
    db:
        'Profitieren Sie außerhalb der Hauptreisezeiten von Sparpreis-Kontingenten ab 19,90 Euro und reisen günstig im ICE, IC/EC durch ganz Deutschland. Solange der Vorrat reicht.',
    vw:
        'MOIA is the newest company in the Volkswagen Group. Officially launched in December 2016, MOIA was set up for the purpose of redefining mobility for people living in urban areas. This independent company based in Berlin, Hamburg and Helsinki does not see itself as an automaker or a pure-play car-sharing provider...',
}

const imageSrcMap = {
    bmw: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/DriveNow_logo.svg',
    db:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Deutsche_Bahn_AG-Logo.svg/744px-Deutsche_Bahn_AG-Logo.svg.png',
    vw: 'https://www.volkswagenag.com/presence/markenundmodelle/images/teaser/moia/MOIA_Teaser.jpg',
}

class SimpleMediaCard extends React.Component {
    state = {
        loading: false,
        data: {},
        orderStatus: null,
        logs: [],
    }
    handleConfirmed = () => {
        this.setState({ orderStatus: 'On Tangle' })
    }
    handleError = err => {
        alert(err)
    }
    handleUpdate = msg => {
        this.setState({ logs: this.state.logs.concat(msg) })
    }
    componentWillMount = async () => {
        const {
            match: { params },
        } = this.props
        const data = await fetch(`http://localhost:8080/api/offer/${params.type}`).then(data => data.json())

        this.setState({ data: data, loading: true })
    }
    render() {
        const {
            classes,
            match: { params },
        } = this.props

        return this.state.loading ? (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingTop: 20,
                }}
            >
                <Card className={classes.card}>
                    <CardMedia
                        style={{ backgroundSize: 'contain' }}
                        className={classes.media}
                        image={imageSrcMap[this.state.data.provider.toLowerCase()]}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.state.data.productName}
                        </Typography>
                        <Typography component="p">{descriptionMap[this.state.data.provider.toLowerCase()]}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            {`Price: ${this.state.data.price} €`}
                        </Button>
                        <Button size="small" color="primary">
                            {`CO2 Emission: ${this.state.data.co2emission}`}
                        </Button>
                    </CardActions>
                </Card>
                <div
                    style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        style={{ width: '90%', marginTop: 50 }}
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            this.setState({ orderStatus: 'Attaching...' })
                            setTimeout(
                                confirm(this.state.data, this.handleConfirmed, this.handleError, this.handleUpdate),
                                100,
                            )
                        }}
                    >
                        {this.state.orderStatus || 'Confirm Payment'}
                    </Button>
                </div>
                <ul
                    style={{
                        width: '100%',
                        wordWrap: 'break-word',
                    }}
                >
                    {this.state.logs.map((v, i) => <li key={i}>{v}</li>)}
                </ul>
            </div>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
                <CircularProgress size={50} />
            </div>
        )
    }
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleMediaCard)

// export default ({ match }) => <SimpleMediaCard/>
