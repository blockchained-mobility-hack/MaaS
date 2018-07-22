import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
})

const Location = ({ classes, handleChange, iden, location = 'none' }) => {
    return (
        <form style={{ width: '49%' }} className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
                <Select
                    value={location}
                    onChange={handleChange}
                    inputProps={{
                        name: iden,
                        id: iden,
                    }}
                >
                    <MenuItem value="none">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="munich">Munich</MenuItem>
                    <MenuItem value="berlin">Berlin</MenuItem>
                </Select>
            </FormControl>
        </form>
    )
}

Location.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Location)
