import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
}

const imageSrcMap = {
    bmw: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/DriveNow_logo.svg',
}

const fakeData = {
    cheapest: {
        id: '1234',
        productName: 'DriveNow',
        provider: 'BMW',
        description: 'some Text',
        validFrom: '20180720',
        validTo: '20180725',
        locationStart: 'Munich',
        locationEnd: 'Berlin',
        price: '100',
        currency: 'eur',
        co2emission: '510',
        speed: '100',
        address: 'XXXXXXXXXXXXXX',
    },
    fastest: {
        id: '1234',
        productName: 'Sparpreis',
        provider: 'DB',
        description: 'some Text',
        validFrom: '20180720',
        validTo: '20180725',
        locationStart: 'Munich',
        locationEnd: 'Berlin',
        price: '100',
        currency: 'eur',
        co2emission: '510',
        speed: '100',
        address: 'XXXXXXXXXXXXXX',
    },
}

function SimpleMediaCard(props) {
    const { classes, match: { params } } = props
    const data = fakeData[params.type]

    return (
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
                    image={imageSrcMap[data.provider.toLowerCase()]}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {data.productName}
                    </Typography>
                    <Typography component="p">{descriptionMap[data.provider.toLowerCase()]}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        {`Price: ${data.price} €`}
                    </Button>
                    <Button size="small" color="primary">
                        {`CO2 Emission: ${data.co2emission}`}
                    </Button>
                </CardActions>
            </Card>
            <div
                style={{ paddingLeft: 20, paddingRight: 20, width: '100%', display: 'flex', justifyContent: 'center' }}
            >
                <Button style={{ width: '90%', marginTop: 50 }} size="large" color="primary" variant="contained">
                    Confirm
                </Button>
            </div>
        </div>
    )
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleMediaCard)

// export default ({ match }) => <SimpleMediaCard/>
